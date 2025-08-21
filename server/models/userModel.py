from pydantic import BaseModel

class userReqMod(BaseModel):
    email: str
    password: str
    username: str
    name: str
    college: str
    branch: str
    year: str

class loginReqMod(BaseModel):
    email: str
    password: str

class userResMod(BaseModel):
    error: bool
    token: str
    username: str