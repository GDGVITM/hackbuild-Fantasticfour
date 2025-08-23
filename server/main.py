import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes.authRoute import router as auth_router
from routes.liveblocksRoute import router as liveblocks_router
from routes.genaiRoute import router as genai_router
from routes.quizRoute import router as quiz_router
from routes.userSubjectRoute import router as user_subject_router
from routes.branchRoute import router as branch_router
from routes.subjectRoute import router as subject_router
from routes.classroomRoute import router as classroom_router

load_dotenv()
app = FastAPI()

allowed_origin = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router, prefix="/auth")
app.include_router(liveblocks_router, prefix="/liveblocks")
app.include_router(genai_router, prefix="/genai")
app.include_router(quiz_router, prefix="/quiz")
app.include_router(user_subject_router, prefix="/user-subject")
app.include_router(branch_router, prefix="/branch")
app.include_router(subject_router, prefix="/subject")
app.include_router(classroom_router, prefix="/classroom")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)