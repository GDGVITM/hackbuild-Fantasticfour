from fastapi import APIRouter, HTTPException, Header
from typing import Optional, List
import httpx
import os
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class Assignment(BaseModel):
    course: str
    title: str
    due: datetime
    description: Optional[str] = ""

class AssignmentsResponse(BaseModel):
    assignments: List[Assignment]
    error: Optional[str] = None

@router.get("/assignments", response_model=AssignmentsResponse)
async def get_assignments(authorization: str = Header(...)):
    """
    Get upcoming assignments from Google Classroom
    Expects Authorization header with Bearer token
    """
    try:
        # Extract token from Authorization header
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authorization header")
        
        access_token = authorization.split("Bearer ")[1]
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        async with httpx.AsyncClient() as client:
            # Get courses
            courses_response = await client.get(
                "https://classroom.googleapis.com/v1/courses",
                headers=headers,
                params={"courseStates": "ACTIVE"}
            )
            
            if courses_response.status_code != 200:
                raise HTTPException(status_code=courses_response.status_code, 
                                  detail="Failed to fetch courses from Google Classroom")
            
            courses_data = courses_response.json()
            courses = courses_data.get("courses", [])
            
            all_assignments = []
            
            # Get assignments for each course
            for course in courses:
                try:
                    coursework_response = await client.get(
                        f"https://classroom.googleapis.com/v1/courses/{course['id']}/courseWork",
                        headers=headers
                    )
                    
                    if coursework_response.status_code == 200:
                        coursework_data = coursework_response.json()
                        coursework = coursework_data.get("courseWork", [])
                        
                        for work in coursework:
                            if work.get("dueDate"):
                                # Parse due date
                                due_date_data = work["dueDate"]
                                due_time_data = work.get("dueTime", {})
                                
                                due_datetime = datetime(
                                    year=due_date_data["year"],
                                    month=due_date_data["month"],
                                    day=due_date_data["day"],
                                    hour=due_time_data.get("hours", 23),
                                    minute=due_time_data.get("minutes", 59)
                                )
                                
                                # Only include future assignments
                                if due_datetime >= datetime.now():
                                    assignment = Assignment(
                                        course=course.get("name", "Unknown Course"),
                                        title=work.get("title", "Untitled Assignment"),
                                        due=due_datetime,
                                        description=work.get("description", "")
                                    )
                                    all_assignments.append(assignment)
                                    
                except Exception as course_error:
                    print(f"Error fetching assignments for course {course.get('name')}: {course_error}")
                    continue
            
            # Sort by due date (earliest first)
            all_assignments.sort(key=lambda x: x.due)
            
            return AssignmentsResponse(assignments=all_assignments)
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching assignments: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch assignments from Google Classroom")