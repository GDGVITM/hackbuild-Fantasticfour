from passlib.context import CryptContext
from jose import jwt,JWTError
import os
from dotenv import load_dotenv
load_dotenv()
pwd_context=CryptContext(schemes=['bcrypt'],deprecated='auto')

def hashed_pass(password:str)->str:
    return pwd_context.hash(password)

def verify_hash_pass(plain_pass:str,hashed_pass:str)->bool:
    return pwd_context.verify(plain_pass,hashed_pass)

ALGORITHM='HS256'

def jwt_encode(data:str)->str:
    payload={'sub':str(data)}
    token=jwt.encode(payload,os.getenv("SECRET_KEY"),algorithm=ALGORITHM)
    return token

def jwt_decode(token:str):
    try:
        payload=jwt.decode(token,os.getenv("SECRET_KEY"),algorithms=[ALGORITHM])
        return payload['sub']
    except JWTError:
        print("error")