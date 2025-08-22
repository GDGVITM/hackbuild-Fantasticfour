from pydantic import BaseModel
from typing import List, Optional

class studentSubjectAddReqMod(BaseModel):
    student_id: str
    subject_id: int
    attendance: Optional[float] = 0.00

class studentSubjectGetReqMod(BaseModel):
    student_id: str

class studentSubjectUpdateReqMod(BaseModel):
    student_id: str
    subject_id: int
    attendance: float

class studentSubjectDelReqMod(BaseModel):
    student_id: str
    subject_id: int

class studentSubjectResMod(BaseModel):
    error: bool
    message: str
    data: List[dict] = []