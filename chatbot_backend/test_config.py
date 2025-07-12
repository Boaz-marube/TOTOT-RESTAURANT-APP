from src.config import get_settings

settings = get_settings()

print("✅ Config loaded successfully!")
print("App Name:", settings.APP_NAME)
print("Model ID:", settings.LLAMA_MODEL_ID)
print("Token starts with:", settings.HF_TOKEN[:5] + "*")