from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_url: str
    secret_key: str
    openai_api_key: str
    openai_embedding_model: str = "text-embedding-3-small"

    class Config:
        env_file = ".env"

settings = Settings()
