from fastapi import APIRouter
from supabase import create_client, Client
import os
from models.studentSubjectModel import (
    studentSubjectAddReqMod, 
    studentSubjectGetReqMod, 
    studentSubjectUpdateReqMod, 
    studentSubjectDelReqMod, 
    studentSubjectResMod
)

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/add", response_model=studentSubjectResMod)
async def add_student_subject(req: studentSubjectAddReqMod):
    try:
        # Check if relationship already exists
        response = supabase.table("student_subject").select("*").eq("student_id", req.student_id).eq("subject_id", req.subject_id).execute()
        if response.data:
            return {"error": True, "message": "Student-subject relationship already exists", "data": []}
        
        # Insert new relationship
        response = supabase.table("student_subject").insert({
            "student_id": req.student_id,
            "subject_id": req.subject_id,
            "attendance": req.attendance
        }).execute()
        
        return {"error": False, "message": "Student-subject relationship added successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to add student-subject relationship: {str(e)}", "data": []}

@router.post("/get", response_model=studentSubjectResMod)
async def get_student_subjects(req: studentSubjectGetReqMod):
    try:
        response = supabase.table("student_subject").select("*").eq("student_id", req.student_id).execute()
        
        return {"error": False, "message": "Student subjects retrieved successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to retrieve student subjects: {str(e)}", "data": []}

@router.post("/update", response_model=studentSubjectResMod)
async def update_student_subject_attendance(req: studentSubjectUpdateReqMod):
    try:
        # Check if relationship exists
        check_response = supabase.table("student_subject").select("*").eq("student_id", req.student_id).eq("subject_id", req.subject_id).execute()
        if not check_response.data:
            return {"error": True, "message": "Student-subject relationship not found", "data": []}
        
        # Update attendance
        response = supabase.table("student_subject").update({
            "attendance": req.attendance
        }).eq("student_id", req.student_id).eq("subject_id", req.subject_id).execute()
        
        return {"error": False, "message": "Attendance updated successfully", "data": response.data}
    except Exception as e:
        return {"error": True, "message": f"Failed to update attendance: {str(e)}", "data": []}

@router.post("/delete", response_model=studentSubjectResMod)
async def delete_student_subject(req: studentSubjectDelReqMod):
    try:
        response = supabase.table("student_subject").delete().eq("student_id", req.student_id).eq("subject_id", req.subject_id).execute()
        
        if not response.data:
            return {"error": True, "message": "Student-subject relationship not found", "data": []}
        
        return {"error": False, "message": "Student-subject relationship deleted successfully", "data": []}
    except Exception as e:
        return {"error": True, "message": f"Failed to delete student-subject relationship: {str(e)}", "data": []}