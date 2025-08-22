from fastapi import APIRouter
from supabase import create_client, Client
import os
from models.userSubjectModel import userSubjectReqMod, userSubjectGetReqMod, userSubjectDelReqMod, userSubjectResMod

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/add", response_model=userSubjectResMod)
async def add_user_subject(req: userSubjectReqMod):
    try:
        # Check if relationship already exists
        response = supabase.table("user_subject").select("*").eq("uid", req.uid).eq("subject_id", req.subject_id).execute()
        if response.data:
            return {"error": True, "message": "User-subject relationship already exists", "data": []}
        
        # Insert new relationship
        response = supabase.table("user_subject").insert({
            "uid": req.uid,
            "subject_id": req.subject_id
        }).execute()
        
        return {"error": False, "message": "User-subject relationship added successfully", "data": []}
    except Exception as e:
        return {"error": True, "message": f"Failed to add user-subject relationship: {str(e)}", "data": []}

@router.post("/get", response_model=userSubjectResMod)
async def get_user_subjects(req: userSubjectGetReqMod):
    try:
        response = supabase.table("user_subject").select("*").eq("uid", req.uid).execute()
        
        return {"error": False, "message": "User subjects retrieved successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve user subjects: {str(e)}", "data": []}

@router.post("/delete", response_model=userSubjectResMod)
async def delete_user_subject(req: userSubjectDelReqMod):
    try:
        response = supabase.table("user_subject").delete().eq("uid", req.uid).eq("subject_id", req.subject_id).execute()
        
        if not response.data:
            return {"error": True, "message": "User-subject relationship not found", "data": []}
        
        return {"error": False, "message": "User-subject relationship deleted successfully", "data": []}
    except Exception as e:
        return {"error": True, "message": f"Failed to delete user-subject relationship: {str(e)}", "data": []}