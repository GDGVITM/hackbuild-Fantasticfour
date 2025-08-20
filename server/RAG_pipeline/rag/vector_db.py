import os
import chromadb
from chromadb.config import Settings
from chromadb import PersistentClient
from sentence_transformers import SentenceTransformer
from PyPDF2 import PdfReader

class VectorStore:
    def __init__(self, collection_name="textbook_chunks"):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.client = PersistentClient(path="chroma_store")
        self.collection = self.client.get_or_create_collection(collection_name)

    def extract_text(self, pdf_path):
        reader = PdfReader(pdf_path)
        return "\n".join(page.extract_text() for page in reader.pages if page.extract_text())

    def chunk_text(self, text, chunk_size=500, overlap=50):
        chunks = []
        start = 0
        while start < len(text):
            end = start + chunk_size
            chunks.append(text[start:end])
            start += chunk_size - overlap
        return chunks

    def add_textbook(self, cluster_id, pdf_path):
        raw_text = self.extract_text(pdf_path)
        chunks = self.chunk_text(raw_text)
        embeddings = self.model.encode(chunks).tolist()
        ids = [f"{cluster_id}_{i}" for i in range(len(chunks))]
        metadatas = [{"cluster_id": cluster_id}] * len(chunks)
        self.collection.add(documents=chunks, embeddings=embeddings, ids=ids, metadatas=metadatas)

    def retrieve_relevant_chunks(self, cluster_id, query, top_k=3):
        query_embedding = self.model.encode([query])[0].tolist()
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where={"cluster_id": cluster_id}
        )
        return results["documents"][0] if results["documents"] else []
