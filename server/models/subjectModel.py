from pydantic import BaseModel
from typing import List, Optional

class subjectReqMod(BaseModel):
    subject_id: int
    subject_name: str
    branch_id: Optional[int] = None
    sem: int

class subjectGetReqMod(BaseModel):
    subject_id: int

class subjectGetByBranchReqMod(BaseModel):
    branch_id: int

class subjectGetBySemReqMod(BaseModel):
    sem: int

class subjectResMod(BaseModel):
    error: bool
    message: str
    data: List[dict] = []