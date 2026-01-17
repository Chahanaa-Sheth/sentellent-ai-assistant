from sqlalchemy.orm import Session
from . import models


def create_message(
    db: Session,
    session_id: str,
    role: str,
    content: str
):
    message = models.Message(
        session_id=session_id,
        role=role,
        content=content
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

def get_messages_by_session(db: Session, session_id: str):
    return (
        db.query(models.Message)
        .filter(models.Message.session_id == session_id)
        .order_by(models.Message.id.asc())
        .all()
    )
