from fastapi import APIRouter
from supabase import create_client, Client
import os
from models.subjectModel import subjectReqMod, subjectGetReqMod, subjectGetByBranchReqMod, subjectGetBySemReqMod, subjectResMod

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/add", response_model=subjectResMod)
async def add_subject(req: subjectReqMod):
    try:
        # Check if subject_id already exists
        response = supabase.table("subject").select("subject_id").eq("subject_id", req.subject_id).execute()
        if response.data:
            return {"error": True, "message": "Subject ID already exists", "data": []}
        
        # Insert new subject
        response = supabase.table("subject").insert({
            "subject_id": req.subject_id,
            "subject_name": req.subject_name,
            "branch_id": req.branch_id,
            "sem": req.sem
        }).execute()
        
        return {"error": False, "message": "Subject added successfully", "data": []}
    except Exception as e:
        return {"error": True, "message": f"Failed to add subject: {str(e)}", "data": []}

@router.post("/get", response_model=subjectResMod)
async def get_subject(req: subjectGetReqMod):
    try:
        response = supabase.table("subject").select("*").eq("subject_id", req.subject_id).execute()
        if not response.data:
            return {"error": True, "message": "Subject not found", "data": []}
        
        return {"error": False, "message": "Subject retrieved successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve subject: {str(e)}", "data": []}

@router.post("/get-by-branch", response_model=subjectResMod)
async def get_subjects_by_branch(req: subjectGetByBranchReqMod):
    try:
        response = supabase.table("subject").select("*").eq("branch_id", req.branch_id).execute()
        
        return {"error": False, "message": "Subjects retrieved successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve subjects: {str(e)}", "data": []}

@router.post("/get-by-sem", response_model=subjectResMod)
async def get_subjects_by_semester(req: subjectGetBySemReqMod):
    try:
        response = supabase.table("subject").select("*").eq("sem", req.sem).execute()
        
        return {"error": False, "message": "Subjects retrieved successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve subjects: {str(e)}", "data": []}

@router.get("/all", response_model=subjectResMod)
async def get_all_subjects():
    try:
        response = supabase.table("subject").select("*").execute()
        
        return {"error": False, "message": "All subjects retrieved successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve subjects: {str(e)}", "data": []}