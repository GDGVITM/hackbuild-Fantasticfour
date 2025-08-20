from .gemini_integration import GeminiIntegration
from .vector_db import VectorStore

class RagPipeline:
    def __init__(self, cluster):
        self.cluster = cluster
        self.vectorstore = VectorStore()
        self.llm = GeminiIntegration(api_key="YOUR_GEMINI_API_KEY")

    def generate_text(self, prompt):
        cluster_id = self.cluster["cluster_id"]
        context_chunks = self.vectorstore.retrieve_relevant_chunks(cluster_id, prompt)
        context = "\n---\n".join(context_chunks)
        enriched_prompt = f"{prompt}\n\nContext:\n{context}"
        return self.llm.generate_text(enriched_prompt)