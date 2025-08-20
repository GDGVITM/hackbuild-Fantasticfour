from fastapi.responses import FileResponse
from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from pydantic import BaseModel
import json
import os

from .admin.upload_textbook import AdminUpload
from .admin.create_cluster import ClusterCreator
from .rag.pipeline import RagPipeline

CLUSTER_METADATA_FILE = "clusters.json"

def load_cluster_metadata():
    try:
        with open(CLUSTER_METADATA_FILE, "r") as f:
            return json.load(f)
    except Exception:
        return {}

app = FastAPI()

class ClusterCreateRequest(BaseModel):
    textbook_path: str

class RAGRequest(BaseModel):
    cluster_id: str
    prompt: str

class RAGResponse(BaseModel):
    generated_text: str


@app.post("/admin/upload_and_cluster")
async def upload_and_create_cluster(file: UploadFile = File(...)):
    uploader = AdminUpload()
    creator = ClusterCreator()
    try:
        # 1. Upload the textbook
        file_path = await uploader.upload_textbook(file)
        # 2. Create the cluster
        cluster_id = creator.create_cluster(file_path)
        return {
            "message": "Textbook uploaded and cluster created successfully.",
            "file_path": file_path,
            "cluster_id": cluster_id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/rag/list_clusters")
async def list_clusters():
    clusters = load_cluster_metadata()
    return [{"cluster_id": cid, "path": meta["textbook_path"]} for cid, meta in clusters.items()]

@app.get("/rag/view_pdf")
async def view_pdf(cluster_id: str = Query(...)):
    clusters = load_cluster_metadata()
    cluster_info = clusters.get(cluster_id)
    if not cluster_info:
        raise HTTPException(status_code=404, detail="Cluster not found.")

    path = cluster_info["textbook_path"]
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found on disk.")
    
    return FileResponse(path, media_type="application/pdf")

@app.post("/rag/chunks")
async def get_rag_chunks(request: RAGRequest):
    clusters = load_cluster_metadata()
    cluster_info = clusters.get(request.cluster_id)
    if not cluster_info:
        raise HTTPException(status_code=404, detail="Cluster not found.")

    pipeline = RagPipeline(cluster=cluster_info)
    relevant_chunks = pipeline.vectorstore.retrieve_relevant_chunks(
        cluster_id=request.cluster_id, query=request.prompt
    )
    
    return {
        "prompt": request.prompt,
        "response": pipeline.generate_text(request.prompt), 
        "relevant_chunks": relevant_chunks
    }