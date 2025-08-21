import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes.authRoute import router as auth_router
from routes.liveblocksRoute import router as liveblocks_router
from routes.atsRoute import router as ats_router 


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
app.include_router(ats_router, prefix="/ats")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)