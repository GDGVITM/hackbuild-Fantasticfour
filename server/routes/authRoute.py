from fastapi import APIRouter, HTTPException
from supabase import create_client, Client
import os
from auth import hashed_pass, verify_hash_pass, jwt_encode
import uuid
from models import userReqMod,userResMod,loginReqMod

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/login", response_model=userResMod)
async def login(req: loginReqMod):
    response = supabase.table("login").select("uid, password ,username").eq("email", req.email).single().execute()
    if not response.data:
        return {"error": True, "token": ""}
    user = response.data
    if not verify_hash_pass(req.password, user["password"]):
        return {"error": True, "token": ""}
    return {"error": False, "token": user["uid"],"username":user["username"]}

@router.post("/register", response_model=userResMod)
async def register(req: userReqMod):
    response = supabase.table("login").select("uid").eq("email", req.email).execute()
    if response.data:
        return {"error": True, "token": ""}
    hash_pass = hashed_pass(req.password)
    response = supabase.table("login").insert({
        "uid": str(uuid.uuid4()),
        "email": req.email,
        "password": hash_pass,
        "username":req.username
    }).execute()
    user_id = response.data[0]["uid"]
    return {"error": False, "token": user_id,"username":req.username}