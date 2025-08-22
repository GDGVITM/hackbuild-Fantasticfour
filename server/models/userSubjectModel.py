from pydantic import BaseModel
from typing import List

class userSubjectReqMod(BaseModel):
    uid: int
    subject_id: int

class userSubjectGetReqMod(BaseModel):
    uid: int

class userSubjectDelReqMod(BaseModel):
    uid: int
    subject_id: int

class userSubjectResMod(BaseModel):
    error: bool
    message: str
    data: List[dict] = []