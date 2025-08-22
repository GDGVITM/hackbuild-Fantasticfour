from pydantic import BaseModel
from typing import List

class branchReqMod(BaseModel):
    branch_id: int
    branch_name: str

class branchGetReqMod(BaseModel):
    branch_id: int

class branchResMod(BaseModel):
    error: bool
    message: str
    data: List[dict] = []