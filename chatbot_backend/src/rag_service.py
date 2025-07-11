import os
import logging
from langchain_community.embeddings import HuggingFaceEmbeddings 
from langchain_pinecone import PineconeVectorStore
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from typing import List, Dict, Any, Tuple

from pinecone import Pinecone

logger = logging.getLogger(__name__)

# --- Configuration for Embeddings ---
EMBEDDING_MODEL_ID = "all-MiniLM-L6-v2"
EMBEDDING_DIMENSION = 384 

class RAGService:
    def __init__(self):  
        self.vectorstore = None
        self.rag_chain = None
        self.embeddings = None
        self.pinecone_client = None # To store the Pinecone client instance
        self.pinecone_index_obj = None # To store the Pinecone index object
        self.retriever = None  # Storing retriever separately for transparency

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

        #  Constructing the RAG Chain with transparency
        if llm_pipeline and self.vectorstore:
            # Creating retriever with more documents for transparency
            self.retriever = self.vectorstore.as_retriever(
                search_type="similarity",
                search_kwargs={"k": 5}  # Retrieving top 5 documents for transparency
            )
            
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
                {"context": self.retriever, "question": RunnablePassthrough()}
                | rag_prompt
                | llm_pipeline 
                | StrOutputParser()
            )
            logger.info(f"[{settings.APP_NAME}] RAG chain constructed successfully!")
        else:
            logger.warning(f"[{settings.APP_NAME}] RAG chain could not be constructed due to missing LLM pipeline or Pinecone setup.")
            self.rag_chain = None

    async def process_query(self, query: str) -> Tuple[str, List[Dict[str, Any]]]:
        """
        Processes a query using the RAG chain and returns both response and source documents.
        Returns: (response, source_documents)
        """
        if not self.rag_chain or not self.retriever:
            raise RuntimeError("RAG chain not initialized.")
        
        # Retrieving relevant documents
        logger.info(f"[RAG] Retrieving relevant documents for query: '{query}'")
        retrieved_docs = await self.retriever.ainvoke(query)
        
        #  Logging the retrieval process
        logger.info(f"[RAG] Retrieved {len(retrieved_docs)} documents from vector store")
        
        # Processing documents for transparency
        source_documents = []
        for i, doc in enumerate(retrieved_docs):
            # Extract content and metadata
            content = doc.page_content if hasattr(doc, 'page_content') else str(doc)
            metadata = doc.metadata if hasattr(doc, 'metadata') else {}
            
            # Calculating relevance score if available
            relevance_score = metadata.get('score', 'N/A')
            
            source_doc = {
                "rank": i + 1,
                "content": content[:500] + "..." if len(content) > 500 else content,  
                "full_content_length": len(content),
                "metadata": {
                    "source": metadata.get('source', 'Unknown'),
                    "title": metadata.get('title', 'Untitled'),
                    "page": metadata.get('page', 'N/A'),
                    "relevance_score": relevance_score,
                    "document_type": metadata.get('type', 'text'),
                    **metadata  # Including all original metadata
                }
            }
            source_documents.append(source_doc)
            
            # Logging each retrieved document for transparency
            logger.info(f"[RAG] Document {i+1}: Source='{metadata.get('source', 'Unknown')}', "
                       f"Length={len(content)} chars, Score={relevance_score}")
        
        # Generate response using the RAG chain
        logger.info(f"[RAG] Generating response using {len(retrieved_docs)} context documents")
        response = await self.rag_chain.ainvoke(query)
        
        #  Logging the final response generation
        logger.info(f"[RAG] Response generated successfully. Length: {len(response)} characters")
        
        return response, source_documents

    def get_retrieval_stats(self) -> Dict[str, Any]:
        """
        Returns statistics about the vector store for transparency.
        """
        if not self.vectorstore or not self.pinecone_index_obj:
            return {"status": "not_initialized"}
        
        try:
            index_stats = self.pinecone_index_obj.describe_index_stats()
            
            return {
                "status": "ready",
                "total_vectors": index_stats.get('total_vector_count', 0),
                "dimension": index_stats.get('dimension', EMBEDDING_DIMENSION),
                "index_fullness": index_stats.get('index_fullness', 0),
                "embedding_model": EMBEDDING_MODEL_ID
            }
        except Exception as e:
            logger.error(f"[RAG] Error getting retrieval stats: {e}")
            return {"status": "error", "error": str(e)}

    async def test_retrieval(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """
        Test retrieval functionality and return detailed results for debugging.
        """
        if not self.retriever:
            raise RuntimeError("Retriever not initialized.")
        
        logger.info(f"[RAG] Testing retrieval for query: '{query}' with k={k}")
        
        # Perform similarity search with scores
        try:
            if hasattr(self.vectorstore, 'similarity_search_with_score'):
                docs_with_scores = await self.vectorstore.asimilarity_search_with_score(query, k=k)
                test_results = []
                
                for doc, score in docs_with_scores:
                    test_results.append({
                        "content": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content,
                        "metadata": doc.metadata,
                        "similarity_score": float(score),
                        "content_length": len(doc.page_content)
                    })
                
                logger.info(f"[RAG] Test retrieval completed. Found {len(test_results)} results")
                return test_results
            else:
                # Fallback to regular retrieval
                docs = await self.retriever.ainvoke(query)
                test_results = []
                
                for doc in docs[:k]:
                    test_results.append({
                        "content": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content,
                        "metadata": doc.metadata,
                        "similarity_score": "N/A",
                        "content_length": len(doc.page_content)
                    })
                
                logger.info(f"[RAG] Test retrieval completed. Found {len(test_results)} results")
                return test_results
                
        except Exception as e:
            logger.error(f"[RAG] Error during test retrieval: {e}")
            raise
    
    def is_ready(self) -> bool:
        """Checks if the RAG service (and chain) is ready."""
        return self.rag_chain is not None and self.retriever is not None