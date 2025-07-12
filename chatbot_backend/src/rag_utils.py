print("starting execution")
import os
from typing import List
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
import logging

logger = logging.getLogger(__name__)

def load_documents(data_path: str = "data") -> List[Document]:
    if not os.path.exists(data_path):
        logger.error(f"Data directory not found: {data_path}")
        return []

    logger.info(f"Loading documents from {data_path}...")
    try:
        loader = DirectoryLoader(
            data_path,
            glob="**/*.txt",  
            loader_cls=TextLoader,
            loader_kwargs={"encoding": "utf-8"}
        )
        documents = loader.load()
        logger.info(f"Loaded {len(documents)} documents.")
        return documents
    except Exception as e:
        logger.error(f"Error loading documents from {data_path}: {e}")
        return []

def split_documents(documents: List[Document], chunk_size: int = 1000, chunk_overlap: int = 200) -> List[Document]:
    """
    Splits a list of documents into smaller, overlapping chunks.
    """
    if not documents:
        logger.warning("No documents to split. Returning empty list.")
        return []

    logger.info(f"Splitting {len(documents)} documents into chunks (size={chunk_size}, overlap={chunk_overlap})...")
    try:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len, 
            add_start_index=True,#for debugging
        )
        chunks = text_splitter.split_documents(documents)
        logger.info(f"Split documents into {len(chunks)} chunks.")
        return chunks
    except Exception as e:
        logger.error(f"Error splitting documents: {e}")
        return []

# Example usage 
if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(current_dir) 
    data_folder_path = os.path.join(project_root, "data")
    
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    
    print(f"Attempting to load data from: {data_folder_path}")
    docs = load_documents(data_folder_path)
    if docs:
        print(f"\n--- First 200 chars of loaded document 1 ({docs[0].metadata.get('source', 'N/A')}): ---")
        print(docs[0].page_content[:200])
        
        chunks = split_documents(docs)
        if chunks: # Checking if chunks were actually created
            print(f"\n--- First 200 chars of first chunk ({chunks[0].metadata.get('source', 'N/A')}, start_index={chunks[0].metadata.get('start_index')}): ---")
            print(chunks[0].page_content[:200])
        else:
            print("No chunks were created from documents.")
    else:
        print("No documents loaded. Check data path and file permissions.")