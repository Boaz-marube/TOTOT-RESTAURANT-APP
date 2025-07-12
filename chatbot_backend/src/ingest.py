import os
import sys
import logging

# Add the src directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_pinecone import PineconeVectorStore 
from rag_utils import load_documents, split_documents 
from dotenv import load_dotenv

# Configuring logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables at module level
load_dotenv()

# --- Configuration ---
DATA_PATH = "data"
# Pinecone specific configurations
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
EMBEDDING_DIMENSION = 384

EMBEDDING_MODEL_ID = "all-MiniLM-L6-v2"  
EMBEDDING_DIMENSION = 384  

def create_vector_db():
    """
    Loads documents, splits them, creates embeddings, and stores them in Pinecone.
    """
    logger.info(f"Starting document ingestion and Pinecone index creation/update...")

    pinecone_api_key = os.getenv("PINECONE_API_KEY")
    pinecone_environment = os.getenv("PINECONE_ENVIRONMENT")
    hf_token = os.getenv("HF_TOKEN") # Ensuring HF_TOKEN is loaded if needed for embedding model

    if not pinecone_api_key or not pinecone_environment or not PINECONE_INDEX_NAME:
        logger.error("Pinecone API Key, Environment, or Index Name not found in .env. Aborting.")
        return

    # Loading documents
    documents = load_documents(DATA_PATH)
    if not documents:
        logger.error("No documents loaded. Pinecone ingestion aborted.")
        return

    # Splitting documents into chunks
    chunks = split_documents(documents, chunk_size=1000, chunk_overlap=200)
    if not chunks:
        logger.error("No chunks created from documents. Pinecone ingestion aborted.")
        return

    # Initializing Embedding Model
    logger.info(f"Initializing embedding model: {EMBEDDING_MODEL_ID}...")
    max_retries = 3
    for attempt in range(max_retries):
        try:
            # Setting environment variable to increase timeout
            os.environ["HF_HUB_DOWNLOAD_TIMEOUT"] = "120"  
            
            embeddings = HuggingFaceBgeEmbeddings(
                model_name=EMBEDDING_MODEL_ID,
                model_kwargs={'device': 'cpu'}, 
                encode_kwargs={'normalize_embeddings': True}
            )
            logger.info("Embedding model initialized successfully.")
            break
        except Exception as e:
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt  
                logger.warning(f"Attempt {attempt + 1} failed, retrying in {wait_time} seconds...")
                import time
                time.sleep(wait_time)
            else:
                logger.error(f"All {max_retries} attempts failed to initialize embedding model {EMBEDDING_MODEL_ID}: {e}", exc_info=True)
                return

    # 4. Initializing Pinecone connection
    logger.info(f"Initializing Pinecone with index: {PINECONE_INDEX_NAME}...")
    try:
        # PineconeVectorStore automatically initializes the Pinecone client internally
        # It will also create the index if it doesn't exist and add documents
        vector_db = PineconeVectorStore.from_documents(
            documents=chunks,
            embedding=embeddings,
            index_name=PINECONE_INDEX_NAME,
            pinecone_api_key=pinecone_api_key
        )
        logger.info(f"Documents ingested into Pinecone index '{PINECONE_INDEX_NAME}' successfully.")
        # Pinecone handles persistence automatically on its server
    except Exception as e:
        logger.error(f"Error creating/updating Pinecone index '{PINECONE_INDEX_NAME}': {e}", exc_info=True)
        return

if __name__ == "__main__":
    create_vector_db()