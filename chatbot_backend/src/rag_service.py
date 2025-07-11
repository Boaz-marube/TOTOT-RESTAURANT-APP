import os
import logging
from langchain_community.embeddings import HuggingFaceEmbeddings 
from langchain_pinecone import PineconeVectorStore
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from pinecone import Pinecone

logger = logging.getLogger(__name__)

# --- Configuration for Embeddings ---
EMBEDDING_MODEL_ID = "all-MiniLM-L6-v2"
EMBEDDING_DIMENSION = 384 

class RAGService:
    def _init_(self):
        self.vectorstore = None
        self.rag_chain = None
        self.embeddings = None
        self.pinecone_client = None # To store the Pinecone client instance
        self.pinecone_index_obj = None # To store the Pinecone index object

    async def initialize(self, llm_pipeline, settings):
        """
        Initializes the embedding model, connects to Pinecone, and constructs the RAG chain.
        """
        logger.info(f"[{settings.APP_NAME}] Initializing RAGService components...")

        try:
            pinecone_api_key = settings.PINECONE_API_KEY
            pinecone_environment = settings.PINECONE_ENVIRONMENT
            pinecone_index_name = settings.PINECONE_INDEX_NAME

            if not pinecone_api_key or not pinecone_environment or not pinecone_index_name:
                logger.error(f"[{settings.APP_NAME}] Pinecone API Key, Environment, or Index Name not found in settings. RAG will not be available.")
                self.vectorstore = None
                return

            #  Initializing Pinecone client 
            logger.info(f"[{settings.APP_NAME}] Initializing Pinecone client...")
            self.pinecone_client = Pinecone(api_key=pinecone_api_key, environment=pinecone_environment)
            logger.info(f"[{settings.APP_NAME}] Pinecone client initialized.")

            logger.info(f"[{settings.APP_NAME}] Initializing embedding model for RAG: {EMBEDDING_MODEL_ID}...")
            self.embeddings = HuggingFaceEmbeddings( 
                model_name=EMBEDDING_MODEL_ID,
                model_kwargs={'device': 'cpu'}, 
                encode_kwargs={'normalize_embeddings': True}
            )
            logger.info(f"[{settings.APP_NAME}] Embedding model for RAG initialized.")

            logger.info(f"[{settings.APP_NAME}] Connecting to Pinecone index: {pinecone_index_name}...")
            #  Getting the Pinecone index object 
            self.pinecone_index_obj = self.pinecone_client.Index(pinecone_index_name) # Getting the index object from the client
            
            # Passing the Pinecone index object to PineconeVectorStore 
            self.vectorstore = PineconeVectorStore(
                index=self.pinecone_index_obj, # Passing the initialized index object, not just its name
                embedding=self.embeddings,
            )
            logger.info(f"[{settings.APP_NAME}] Pinecone vector store connected successfully!")

        except Exception as e:
            logger.error(f"[{settings.APP_NAME}] ERROR: Failed to initialize RAG components (Embedding Model or Pinecone): {e}", exc_info=True)
            self.vectorstore = None 
            return 

        #  Constructing the RAG Chain
        if llm_pipeline and self.vectorstore:
            template = """You are a helpful AI assistant for Totot Traditional Restaurant.
            Use the following context to answer the question.
            If you don't know the answer based on the context, politely state that you don't have enough information.

            Context:
            {context}

            Question: {question}

            Answer:
            """
            rag_prompt = ChatPromptTemplate.from_template(template)
            
            self.rag_chain = (
                {"context": self.vectorstore.as_retriever(), "question": RunnablePassthrough()}
                | rag_prompt
                | llm_pipeline 
                | StrOutputParser()
            )
            logger.info(f"[{settings.APP_NAME}] RAG chain constructed successfully!")
        else:
            logger.warning(f"[{settings.APP_NAME}] RAG chain could not be constructed due to missing LLM pipeline or Pinecone setup.")
            self.rag_chain = None

    async def process_query(self, query: str) -> str:
        """Processes a query using the RAG chain."""
        if not self.rag_chain:
            raise RuntimeError("RAG chain not initialized.")
        return await self.rag_chain.ainvoke(query) 
    
    def is_ready(self) -> bool:
        """Checks if the RAG service (and chain) is ready."""
        return self.rag_chain is not None