from fastapi import FastAPI, HTTPException, status 
from contextlib import asynccontextmanager
import uvicorn
import torch # For checking CUDA 
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline 
from langchain_community.llms import HuggingFacePipeline 
import os
import logging

from src.config import get_settings 

# Configuring logging for better visibility during startup/shutdown
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Global variable to hold loaded LLM pipeline
# I use 'None' first because it's loaded during application startup.
llm_pipeline: HuggingFacePipeline = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global llm_pipeline  
    
    settings = get_settings()
    logger.info(f"[{settings.APP_NAME}] Starting up and loading AI models...")

    try:
        # Verifying Hugging Face Token
        if not settings.HF_TOKEN:
            logger.warning(f"[{settings.APP_NAME}] HF-TOKEN not found. Skipping model loading. only /docs and static endpoints will work.")
            yield
            return

        #  Load the Tokenizer
        logger.info(f"[{settings.APP_NAME}] Loading tokenizer for {settings.LLAMA_MODEL_ID}...")
        tokenizer = AutoTokenizer.from_pretrained(
            settings.LLAMA_MODEL_ID,
            token=settings.HF_TOKEN 
        )
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        # Load LLM Model 
        logger.info(f"[{settings.APP_NAME}] Loading model {settings.LLAMA_MODEL_ID}. This may take a while and consume significant RAM/VRAM...")

        # Determining if a CUDA-enabled GPU is available for faster processing
        device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"[{settings.APP_NAME}]✔ Model will run on device: {device.upper()}")
        logger.info(f"[{settings.APP_NAME}]✔Loading model ID: {settings.LLAMA_MODEL_ID}")
        # Using float16 for CUDA for reduced memory usage and faster inference if GPU supports it
        torch_dtype = torch.float16 if device == "cuda" else torch.float32

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
        pipe = pipeline(
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
        )

        #  Wrapping with LangChain's HuggingFacePipeline 
        # This makes my Hugging Face pipeline compatible with LangChain's components.
        llm_pipeline = HuggingFacePipeline(pipeline=pipe)
        logger.info(f"[{settings.APP_NAME}] LLM pipeline loaded successfully!")

        yield # This 'yield' statement is where the application runs.
              # Code below will execute when the application shuts down.

    except Exception as e:
        logger.error(f"[{settings.APP_NAME}] ERROR: Failed to load LLM pipeline during startup: {e}", exc_info=True)
        # If model loading fails, I raise a RuntimeError to prevent the app from starting incorrectly.
        raise RuntimeError(f"Failed to load LLM pipeline: {e}. Check HF_TOKEN, model ID, and system resources.")

    finally:
        # Clean up on shutdown
        logger.info(f"[{settings.APP_NAME}] Shutting down and unloading AI models...")
        llm_pipeline = None  

        # Explicitly deleting model and tokenizer to free up memory 
        if 'model' in locals(): # Checking if model was successfully loaded
            del model
        if 'tokenizer' in locals(): # Checking if tokenizer was successfully loaded
            del tokenizer

        # Clearing CUDA cache if GPU was used
        if torch.cuda.is_available():
            torch.cuda.empty_cache()

        logger.info(f"[{settings.APP_NAME}] LLM pipeline unloaded.")


# Initializing FastAPI application 
app = FastAPI(
    title=get_settings().APP_NAME,
    description=get_settings().APP_DESCRIPTION,
    version=get_settings().APP_VERSION,
    lifespan=lifespan
)

# --- API Endpoints ---

@app.get("/")
async def read_root():
    """
    Root endpoint providing basic information about the API.
    """
    settings = get_settings()
    return {"message": f"Welcome to {settings.APP_NAME}! Access /docs for API documentation."}

@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify API status and LLM model loading.
    """
    settings = get_settings()
    # Check if the llm_pipeline is loaded
    if llm_pipeline is None:
        # If llm_pipeline is None, it means the model failed to load or is not ready
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="LLM service is not ready or failed to load.")

    return {"status": "ok", "message": "API is healthy", "app_version": settings.APP_VERSION, "llm_status": "loaded"}

#  A simple chat endpoint to test the LLM 
from pydantic import BaseModel, Field 

class ChatRequest(BaseModel):
    user_message: str = Field(..., example="Hello, tell me about Totot Restaurant.", description="The user's message to the chatbot.")

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Simple chat endpoint to test Llama 2 inference.
    This will be enhanced significantly with RAG and memory.
    """
    # Ensuring LLM is loaded before attempting to use it
    if llm_pipeline is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Chat service is temporarily unavailable. LLM model not loaded.")

    user_message = request.user_message
    logger.info(f"Received chat message: '{user_message}'")

    try:
        llama2_prompt = (
    f"<|system|>\nYou are a helpful AI assistant for Totot Restaurant. "
    f"Only provide information about Totot Restaurant. If asked about other topics, "
    f"politely state that you are only programmed to assist with restaurant-related queries.</s>\n"
    f"<|user|>\n{user_message}</s>\n"
    f"<|assistant|>"
)

        # llm_pipeline.invoke() sends the text to the HuggingFace model
        raw_ai_response_content = llm_pipeline.invoke(llama2_prompt)
        logger.info(f"Raw LLM response: '{raw_ai_response_content}'")
        #strip whitespace
        ai_response_content = raw_ai_response_content.strip()
        for artifact in ["</s", "<|endoftext|>", "<pad>"]:
            ai_response_content = ai_response_content.replace(artifact,"")

        if not ai_response_content: # In case the model returns nothing meaningful after stripping
             ai_response_content = "I'm sorry, I couldn't generate a response. Can you please rephrase?"


        logger.info(f"Cleaned AI response: '{ai_response_content}'")
        return ChatResponse(response=ai_response_content)

    except Exception as e:
        logger.error(f"Error during chat inference: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during chat processing: {e}. Please try again."
        )

if __name__ == "__main__":
    settings = get_settings()
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)