def get_all_clusters(self):
    return list(self.cluster_metadata.values())

def get_cluster_by_id(self, cluster_id: str):
    return self.cluster_metadata.get(cluster_id, None)

