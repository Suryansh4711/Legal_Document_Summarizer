from pathlib import Path
from pydantic import BaseSettings


class Settings(BaseSettings):
    # Project paths
    BASE_DIR: Path = Path(__file__).parent.parent.parent
    DATA_DIR: Path = BASE_DIR / "data"
    
    # API settings
    API_TITLE: str = "Legal Document Summarizer API"
    API_VERSION: str = "1.0.0"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
