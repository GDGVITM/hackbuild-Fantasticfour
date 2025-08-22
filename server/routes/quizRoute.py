from fastapi import APIRouter, HTTPException
from supabase import create_client, Client
import os
from models.quizModel import quizReqMod, quizGetReqMod, quizResMod

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/add", response_model=quizResMod)
async def add_quiz(req: quizReqMod):
    try:
        # Check if quiz_id already exists
        response = supabase.table("quiz").select("quiz_id").eq("quiz_id", req.quiz_id).execute()
        if response.data:
            return {"error": True, "message": "Quiz ID already exists", "quiz_data": {}}
        
        # Insert new quiz data
        response = supabase.table("quiz").insert({
            "quiz_id": req.quiz_id,
            "quiz_data": req.quiz_data
        }).execute()
        
        return {"error": False, "message": "Quiz added successfully", "quiz_data": {}}
    except Exception as e:
        return {"error": True, "message": f"Failed to add quiz: {str(e)}", "quiz_data": {}}

@router.post("/get", response_model=quizResMod)
async def get_quiz(req: quizGetReqMod):
    try:
        response = supabase.table("quiz").select("quiz_data").eq("quiz_id", req.quiz_id).single().execute()
        if not response.data:
            return {"error": True, "message": "Quiz not found", "quiz_data": {}}
        
        return {"error": False, "message": "Quiz retrieved successfully", "quiz_data": response.data["quiz_data"]}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve quiz: {str(e)}", "quiz_data": {}}