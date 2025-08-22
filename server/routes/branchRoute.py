from fastapi import APIRouter
from supabase import create_client, Client
import os
from models.branchModel import branchReqMod, branchGetReqMod, branchResMod

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/add", response_model=branchResMod)
async def add_branch(req: branchReqMod):
    try:
        # Check if branch_id already exists
        response = supabase.table("branch").select("branch_id").eq("branch_id", req.branch_id).execute()
        if response.data:
            return {"error": True, "message": "Branch ID already exists", "data": []}
        
        # Insert new branch
        response = supabase.table("branch").insert({
            "branch_id": req.branch_id,
            "branch_name": req.branch_name
        }).execute()
        
        return {"error": False, "message": "Branch added successfully", "data": []}
    except Exception as e:
        return {"error": True, "message": f"Failed to add branch: {str(e)}", "data": []}

@router.post("/get", response_model=branchResMod)
async def get_branch(req: branchGetReqMod):
    try:
        response = supabase.table("branch").select("*").eq("branch_id", req.branch_id).execute()
        if not response.data:
            return {"error": True, "message": "Branch not found", "data": []}
        
        return {"error": False, "message": "Branch retrieved successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve branch: {str(e)}", "data": []}

@router.get("/all", response_model=branchResMod)
async def get_all_branches():
    try:
        response = supabase.table("branch").select("*").execute()
        
        return {"error": False, "message": "All branches retrieved successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve branches: {str(e)}", "data": []}