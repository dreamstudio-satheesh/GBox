from fastapi import FastAPI
from app.api import email_router
from app.core.config import settings

app = FastAPI(title="AI Business Mail")

app.include_router(email_router, prefix="/api/emails")
