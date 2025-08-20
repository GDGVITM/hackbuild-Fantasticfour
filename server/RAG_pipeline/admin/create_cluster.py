import os
import json
import uuid
from datetime import datetime
from ..rag.vector_db import VectorStore

CLUSTER_METADATA_FILE = "clusters.json"

class ClusterCreator:
    def __init__(self):
        self.cluster_metadata = self.load_cluster_metadata()

    def create_cluster(self, textbook_path: str):
        if not os.path.exists(textbook_path):
            raise ValueError("Invalid textbook path.")

        cluster_id = str(uuid.uuid4())
        cluster_info = {
            "textbook_path": textbook_path,
            "cluster_id": cluster_id,
            "created_at": datetime.now().isoformat(),
        }
        self.cluster_metadata[cluster_id] = cluster_info
        self.save_cluster_metadata()

        vector_store = VectorStore()
        vector_store.add_textbook(cluster_id, textbook_path)

        return cluster_id

    def load_cluster_metadata(self):
        if os.path.exists(CLUSTER_METADATA_FILE):
            with open(CLUSTER_METADATA_FILE, "r") as f:
                return json.load(f)
        return {}

    def save_cluster_metadata(self):
        with open(CLUSTER_METADATA_FILE, "w") as f:
            json.dump(self.cluster_metadata, f, indent=2)