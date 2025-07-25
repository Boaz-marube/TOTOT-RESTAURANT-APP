from fastapi import FastAPI, HTTPException, status 
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
import torch # For checking CUDA 
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline 
from langchain_community.llms import HuggingFacePipeline 
import os
import logging
from pydantic import BaseModel, Field
from typing import List, Literal, Dict, Any
import sys 
import os

# Add the parent directory to Python path to access src modules
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)
sys.path.insert(0, current_dir)

try:
    from rag_service import RAGService
    from config import get_settings
except ImportError as e:
    print(f"Import error: {e}")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Python path: {sys.path}")
    print(f"Files in current directory: {os.listdir('.')}")
    raise 
from pydantic import BaseModel, Field 

# Configuring logging for better visibility during startup/shutdown
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Global variable to hold loaded LLM pipeline and RAG service instance
llm_pipeline = None
rag_service: RAGService = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global llm_pipeline, rag_service  
    
    settings = get_settings()
    logger.info(f"[{settings.APP_NAME}] Starting up: Initializing LLM and RAG components...")

    try:
        #  Initializing LLM Pipeline 
        # Verifying Hugging Face Token
        if not settings.HF_TOKEN:
            logger.warning(f"[{settings.APP_NAME}] HF_TOKEN not found. Skipping model loading. Only /docs and static endpoints will work.")
            yield # Allows app to run with limited functionality
            return

        # Loading the Tokenizer
        logger.info(f"[{settings.APP_NAME}] Loading tokenizer for {settings.LLAMA_MODEL_ID}...")
        tokenizer = AutoTokenizer.from_pretrained(
            settings.LLAMA_MODEL_ID,
            token=settings.HF_TOKEN 
        )
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        # Determining if a CUDA-enabled GPU is available for faster processing
        device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"[{settings.APP_NAME}]✔ Model will run on device: {device.upper()}")
        logger.info(f"[{settings.APP_NAME}]✔ Loading model ID: {settings.LLAMA_MODEL_ID}")
        
        # Using float16 for CUDA for reduced memory usage and faster inference if GPU supports it
        torch_dtype = torch.float16 if device == "cuda" else torch.float32

        # Consistent variable name: model
        model = AutoModelForCausalLM.from_pretrained(
            settings.LLAMA_MODEL_ID,
            token=settings.HF_TOKEN,     # Using the HF_TOKEN for model access
            torch_dtype=torch_dtype,     # Using specified data type
            low_cpu_mem_usage=True,      # Helpful for large models on CPU
            trust_remote_code=True,      # Necessary for some models if they have custom code
        )

        if device == "cuda":
            logger.info(f"[{settings.APP_NAME}] CUDA available, moving model to GPU.")
            model.to(device) # Moving the model to the GPU
        else:
            logger.info(f"[{settings.APP_NAME}] CUDA not available, running model on CPU (will be slower).")

        model.eval()  

        # Creating Hugging Face Pipeline 
        logger.info(f"[{settings.APP_NAME}] Creating HuggingFacePipeline for LangChain integration...")
        pipe_instance = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            max_new_tokens=120, 
            temperature=0.7,       
            do_sample=True,          
            top_k=50,                   
            top_p=settings.TOP_P,                   
            eos_token_id=tokenizer.eos_token_id,    
            pad_token_id=tokenizer.pad_token_id,  
            return_full_text=False 
        )

        # Wrapping with LangChain's HuggingFacePipeline 
        llm_pipeline = HuggingFacePipeline(pipeline=pipe_instance)
        logger.info(f"[{settings.APP_NAME}] LLM pipeline loaded successfully!")

        #  Initializing RAGService 
        rag_service = RAGService() # Create an instance
        await rag_service.initialize(llm_pipeline, settings) 

        yield # This 'yield' statement is where the application runs.
              # Code below 'yield' will execute when the application shuts down.

    except Exception as e:
        logger.error(f"[{settings.APP_NAME}] ERROR: Failed to initialize application components during startup: {e}", exc_info=True)
        # If model loading or RAG setup fails, raise a RuntimeError to prevent the app from starting incorrectly.
        raise RuntimeError(f"Failed to initialize application components: {e}. Check HF_TOKEN, model ID, Pinecone config, and system resources.")

    finally:
        # Clean up on shutdown
        logger.info(f"[{settings.APP_NAME}] Shutting down and unloading AI models...")
        llm_pipeline = None
        if rag_service:
            rag_service = None
        if 'model' in locals():
            del model
        if 'tokenizer' in locals():
            del tokenizer  
        # Clearing CUDA cache if GPU was used
        if torch.cuda.is_available():
            torch.cuda.empty_cache()

        logger.info(f"[{settings.APP_NAME}] AI components unloaded.")


# Initializing FastAPI application 
app = FastAPI(
    title=get_settings().APP_NAME,
    description=get_settings().APP_DESCRIPTION,
    version=get_settings().APP_VERSION,
    lifespan=lifespan
)

# CORS Configuration
settings = get_settings()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# --- API Endpoints ---

@app.get("/")
async def root():
    settings = get_settings()
    return {"message": f"Welcome to {settings.APP_NAME}! Access /docs for API documentation."}


@app.get("/health")
async def health_check():
    settings = get_settings()
    status_detail = {
        "status": "ok",
        "message": "API is healthy",
        "app_version": settings.APP_VERSION,
        "llm_status": "not_loaded",
        "rag_status": "not_loaded"
    }

    if llm_pipeline is not None:
        status_detail["llm_status"] = "loaded"
    else:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="LLM service is not ready or failed to load.")

    if rag_service and rag_service.is_ready(): # Checking if RAGService is ready
        status_detail["rag_status"] = "loaded"
        # Add RAG statistics
        status_detail["rag_stats"] = rag_service.get_retrieval_stats()
    
    return status_detail

#  Pydantic models for chat endpoint
class ChatMessage(BaseModel):
    role: Literal["user", "assistant"] = Field(..., description="Role of the speaker (user or assistant).")
    content: str = Field(..., description="Content of the message.")

class ChatRequest(BaseModel):
    query: str = Field(..., example="Hello, tell me about Totot Restaurant.", description="The user's current query to the chatbot.")
    chat_history: List[ChatMessage] = Field(default_factory=list, description="Previous conversation turns.")

class ChatResponse(BaseModel):
    response: str
    source_documents: List[Dict[str, Any]] = Field(default_factory=list, description="List of source documents (content and metadata) used for the response.")
    rag_process: Dict[str, Any] = Field(default_factory=dict, description="Information about the RAG process for transparency.")

# New endpoint for testing RAG retrieval
@app.post("/test-retrieval")
async def test_retrieval_endpoint(query: str, k: int = 3):
    """Test endpoint to see what documents are retrieved for a query."""
    settings = get_settings()
    
    if not rag_service or not rag_service.is_ready():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="RAG service is not ready."
        )
    
    try:
        results = await rag_service.test_retrieval(query, k)
        return {
            "query": query,
            "retrieved_documents": results,
            "count": len(results),
            "rag_stats": rag_service.get_retrieval_stats()
        }
    except Exception as e:
        logger.error(f"[{settings.APP_NAME}] Error in test retrieval: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during retrieval test: {e}"
        )

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    settings = get_settings()
    user_query = request.query
    logger.info(f"[{settings.APP_NAME}] Received query: '{user_query}'")

    if rag_service and rag_service.is_ready(): # Checking if RAGService is ready
        try:
            # Enhanced RAG processing with source transparency
            response, source_documents = await rag_service.process_query(user_query)
            
            # Added process information for transparency
            rag_process = {
                "method": "RAG",
                "documents_retrieved": len(source_documents),
                "embedding_model": "all-MiniLM-L6-v2",
                "vector_store": "Pinecone",
                "retrieval_stats": rag_service.get_retrieval_stats()
            }
            
            logger.info(f"[{settings.APP_NAME}] RAG response generated with {len(source_documents)} source documents.")
            
            return ChatResponse(
                response=response, 
                source_documents=source_documents,
                rag_process=rag_process
            )

        except Exception as e:
            logger.error(f"[{settings.APP_NAME}] Error during RAG chat processing via RAGService: {e}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred during RAG chat processing: {e}. Please try again."
            )
    elif llm_pipeline: # Fallback to direct LLM chat if RAG service is not available
        logger.warning(f"[{settings.APP_NAME}] RAG service not available. Falling back to direct LLM chat for query: '{user_query}'")
        try:
            llm_prompt = (
                f"<|system|>\nYou are a helpful AI assistant for Totot Restaurant. "
                f"Only provide information about Totot Restaurant. If asked about other topics, "
                f"politely state that you are only programmed to assist with restaurant-related queries.</s>\n"
                f"<|user|>\n{user_query}</s>\n"
                f"<|assistant|>"
            )
            raw_ai_response_content = llm_pipeline.invoke(llm_prompt)
            ai_response_content = raw_ai_response_content.strip()
            for artifact in ["</s", "<|endoftext|>", "<pad>"]:
                ai_response_content = ai_response_content.replace(artifact,"")

            if not ai_response_content:
                ai_response_content = "I'm sorry, I couldn't generate a response. Can you please rephrase?"

            # Fallback source documents
            source_docs_info = [
                {
                    "rank": 1,
                    "content": "Direct LLM response - no document retrieval performed.",
                    "metadata": {
                        "source": "Direct LLM",
                        "method": "generation_only",
                        "status": "fallback"
                    }
                }
            ]
            
            rag_process = {
                "method": "Direct LLM",
                "documents_retrieved": 0,
                "reason": "RAG service not available"
            }

            logger.info(f"[{settings.APP_NAME}] Direct LLM response generated.")
            return ChatResponse(
                response=ai_response_content, 
                source_documents=source_docs_info,
                rag_process=rag_process
            )

        except Exception as e:
            logger.error(f"[{settings.APP_NAME}] Error during direct LLM chat processing: {e}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred during direct LLM chat processing: {e}. Please try again."
            )
    else: # Neither RAG nor direct LLM is available
        logger.error(f"[{settings.APP_NAME}] No LLM or RAG components loaded. Cannot process query: '{user_query}'")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Chat service is temporarily unavailable. LLM and RAG models not loaded."
        )

if __name__ == "__main__":
    settings = get_settings()
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)