from fastapi import FastAPI 
from contextlib import asynccontextmanager 
import uvicorn 

from src.config import get_settings 

@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings() 
    print(f"[{settings.APP_NAME}] Starting up...")
    print(f"[{settings.APP_NAME}] Settings loaded. App version: {settings.APP_VERSION}")
    print(f"[{settings.APP_NAME}] Shutting down...")

app = FastAPI(
    title=get_settings().APP_NAME,        
    description=get_settings().APP_DESCRIPTION, 
    version=get_settings().APP_VERSION,   
    lifespan=lifespan                     
)

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
    Health check endpoint to verify API status.
    """
    settings = get_settings() 
    return {"status": "ok", "message": "API is healthy", "app_version": settings.APP_VERSION}

if __name__ == "__main__":
    settings = get_settings()
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)