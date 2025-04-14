from fastapi import Body, APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from app.services.ai import get_summary, get_smart_reply
from app.services.embeddings import get_email_embedding
from app.db.database import get_db
from app.db.models import Email
import uuid
from datetime import datetime

email_router = APIRouter()

@email_router.post("/store")
async def store_email_with_embedding(
    subject: str = Body(...), 
    content: str = Body(...), 
    user_id: str = Body(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        embedding = await get_email_embedding(content)
        email = Email(
            id=uuid.uuid4(),
            user_id=user_id,
            subject=subject,
            content=content,
            received_at=datetime.utcnow(),
            embedding=embedding
        )
        db.add(email)
        await db.commit()
        return {"status": "stored", "id": str(email.id)}
    except SQLAlchemyError as db_error:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"DB error: {db_error}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding failed: {e}")

@email_router.get("/")
async def get_emails(db: AsyncSession = Depends(get_db)):
    return {"message": "Fetch emails here"}

@email_router.post("/summarize")
async def summarize_email(content: str = Body(..., embed=True)):
    summary = await get_summary(content)
    return {"summary": summary}

@email_router.post("/reply")
async def smart_reply(content: str = Body(..., embed=True)):
    reply = await get_smart_reply(content)
    return {"reply": reply}
