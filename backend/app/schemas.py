from pydantic import BaseModel

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    response: str

class MessageOut(BaseModel):
    role: str
    content: str

    class Config:
        from_attributes = True
