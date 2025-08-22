from pydantic import BaseModel
from typing import Any

class quizReqMod(BaseModel):
    quiz_id: int
    quiz_data: dict

class quizGetReqMod(BaseModel):
    quiz_id: int

class quizResMod(BaseModel):
    error: bool
    message: str
    quiz_data: dict = {}