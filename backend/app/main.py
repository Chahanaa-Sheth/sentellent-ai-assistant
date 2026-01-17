from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from .database import SessionLocal, engine
from . import models, crud, schemas

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
@app.get("/health")
def health():
    return {"status": "ok"}

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/chat", response_model=schemas.ChatResponse)
def chat(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    # Save user message
    crud.create_message(
        db=db,
        session_id=request.session_id,
        role="user",
        content=request.message
    )

    # ✅ MOCK AI RESPONSE (NO OpenAI CALL)
    reply = f"I remember you said: {request.message}"

    # Save AI response
    crud.create_message(
        db=db,
        session_id=request.session_id,
        role="assistant",
        content=reply
    )

    return {"response": reply}

