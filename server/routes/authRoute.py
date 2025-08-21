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
    response = supabase.table("login").select("uid, password, username").eq("email", req.email).single().execute()
    if not response.data:
        return {"error": True, "token": "", "username": ""}
    user = response.data
    if not verify_hash_pass(req.password, user["password"]):
        return {"error": True, "token": "", "username": ""}
    return {"error": False, "token": user["uid"], "username": user["username"]}

@router.post("/register", response_model=userResMod)
async def register(req: userReqMod):
    response = supabase.table("login").select("uid").eq("email", req.email).execute()
    if response.data:
        return {"error": True, "token": "", "username": ""}
    hash_pass = hashed_pass(req.password)
    user_id = str(uuid.uuid4())
    response = supabase.table("login").insert({
        "uid": user_id,
        "email": req.email,
        "password": hash_pass,
        "username": req.username,
        "name": req.name,
        "college": req.college,
        "branch": req.branch,
        "year": req.year
    }).execute()
    return {"error": False, "token": user_id, "username": req.username}