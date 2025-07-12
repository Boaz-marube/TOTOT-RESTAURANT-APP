from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
import os

class Settings(BaseSettings):
    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env", extra="ignore")

    APP_NAME: str = "Totot Restaurant Chatbot"
    APP_DESCRIPTION: str = "AI-powered chatbot for Totot Traditional Restaurant"
    APP_VERSION: str = "0.0.1"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # LLM settings
    HF_TOKEN: str 
    LLAMA_MODEL_ID: str = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
    TOP_P: float = 0.9

    # Pinecone settings 
    PINECONE_API_KEY: str
    PINECONE_ENVIRONMENT: str
    PINECONE_INDEX_NAME: str
    # LLM Generation Parameters
    MAX_NEW_TOKENS: int = 512
    TEMPERATURE: float = 0.7  
    DO_SAMPLE: bool = True    
    TOP_K: int = 50         
    TOP_P: float = 0.95       

@lru_cache() 
             
def get_settings():
    return Settings()