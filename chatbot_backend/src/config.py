from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
import os

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env',
        extra='ignore',       
        case_sensitive=True   
    )

    # General Application Settings
    APP_NAME: str = "Totot Restaurant Chatbot Backend"
    APP_DESCRIPTION: str = "AI Assistant for the restaurant website, powered by FastAPI, LangChain, and Llama 2."
    APP_VERSION: str = "0.1.0"
    HOST: str = "0.0.0.0" 
    PORT: int = 8000     

    HF_TOKEN: str
    LLAMA_MODEL_ID: str = "meta-llama/Llama-2-7b-chat-hf"

    # LLM Generation Parameters (these are default settings for Llama 2 responses)
    MAX_NEW_TOKENS: int = 512
    TEMPERATURE: float = 0.7  
    DO_SAMPLE: bool = True    
    TOP_K: int = 50         
    TOP_P: float = 0.95       

@lru_cache() # This is a Python decorator that caches the result of the function.
             
def get_settings():
    return Settings()