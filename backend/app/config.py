from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    app_name: str = "InsightIQ API"
    environment: str = "development"
    database_url: str = "sqlite:///./insightiq.db"
    
    # LLM Keys
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    gemini_api_key: Optional[str] = None

    class Config:
        env_file = ".env"

settings = Settings()
