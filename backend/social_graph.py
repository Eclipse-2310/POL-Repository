"""
CampusGuard Social Interaction Graph Module
DISCLAIMER: Graph insights use voluntary/anonymized interaction signals and are
intended strictly as an early-support indicator. Zero invasive surveillance.
"""

import networkx as nx
from typing import Dict, List, Any
import random

class SocialInteractionGraph:
    """
    Analyzes voluntary peer connection networks using NetworkX to identify
    early indicators of social isolation and community fragmentation.
    """
    def __init__(self):
        self.graph = nx.Graph()

    def build_synthetic_cohort_graph(self, student_ids: List[str]) -> Dict[str, Any]:
        """
        Builds a realistic peer interaction network among anonymized student IDs.
        Includes dense study-group clusters, casual bridges, and isolated/peripheral nodes.
        """
        self.graph.clear()
        
        # Add all anonymous nodes
        for sid in student_ids:
            self.graph.add_node(sid)

        # Seed reproducible cluster creation
        random.seed(42)
        n = len(student_ids)

        if n < 4:
            return self.get_graph_metrics()

        # Divide students into realistic campus micro-communities (e.g. clubs, project teams)
        # 1. Main cohort clusters (healthy engagement)
        cluster_a = student_ids[: n // 3]
        cluster_b = student_ids[n // 3 : (2 * n) // 3]
        peripherals = student_ids[(2 * n) // 3 : -3] # low connection
        isolated = student_ids[-3:] # completely isolated or single connection

        # Create intra-cluster connections (dense)
        for cluster in [cluster_a, cluster_b]:
            for i in range(len(cluster)):
                for j in range(i + 1, len(cluster)):
                    if random.random() < 0.55: # 55% chance of voluntary interaction
                        self.graph.add_edge(cluster[i], cluster[j], weight=round(random.uniform(0.6, 1.0), 2))

        # Create inter-cluster bridge connections (cross-department interactions)
        for _ in range(max(3, n // 5)):
            u = random.choice(cluster_a)
            v = random.choice(cluster_b)
            self.graph.add_edge(u, v, weight=round(random.uniform(0.4, 0.8), 2))

        # Connect peripheral students loosely (degree 1 or 2)
        for p in peripherals:
            targets = random.sample(cluster_a + cluster_b, k=min(2, random.randint(1, 2)))
            for t in targets:
                self.graph.add_edge(p, t, weight=round(random.uniform(0.2, 0.5), 2))

        # Intentionally keep the isolated students at degree 0 or 1
        if len(isolated) >= 2:
            # One student with a single fragile connection
            self.graph.add_edge(isolated[0], random.choice(peripherals), weight=0.2)
            # Other 1 or 2 students completely disconnected (degree 0)

        return self.get_graph_metrics()

    def get_graph_metrics(self) -> Dict[str, Any]:
        """
        Calculates NetworkX centrality, clustering, and isolation indices.
        Returns layout coordinates (0-800 scale) for SVG/Canvas rendering.
        """
        G = self.graph
        if len(G.nodes) == 0:
            return {"nodes": [], "edges": [], "summary": {}}

        degree_centrality = nx.degree_centrality(G)
        clustering_coeff = nx.clustering(G)
        degrees = dict(G.degree())

        # Compute 2D spring layout for visualization
        # Use fixed seed for deterministic visual layout
        pos = nx.spring_layout(G, k=0.45, iterations=60, seed=42)

        # Scale coordinates into an 800 x 500 viewport with comfortable padding
        min_x = min(p[0] for p in pos.values())
        max_x = max(p[0] for p in pos.values())
        min_y = min(p[1] for p in pos.values())
        max_y = max(p[1] for p in pos.values())

        def scale_coord(val, min_v, max_v, target_size, pad=60):
            if max_v == min_v:
                return target_size / 2
            norm = (val - min_v) / (max_v - min_v)
            return pad + norm * (target_size - 2 * pad)

        nodes_data = []
        isolated_count = 0
        peripheral_count = 0

        for node in G.nodes:
            deg = degrees.get(node, 0)
            cent = degree_centrality.get(node, 0.0)
            clust = clustering_coeff.get(node, 0.0)

            # Isolation score formula (0 - 100):
            # Degree 0: 95
            # Degree 1: 75
            # Degree 2: 45
            # Higher degree with low clustering: 25-35
            # Connected: 5-15
            if deg == 0:
                iso_score = 95.0
                status = "Severely Isolated"
                isolated_count += 1
            elif deg == 1:
                iso_score = 75.0
                status = "At Risk of Isolation"
                isolated_count += 1
            elif deg <= 2:
                iso_score = 48.0
                status = "Peripheral Connection"
                peripheral_count += 1
            else:
                iso_score = max(5.0, round((1.0 - cent) * 25.0, 1))
                status = "Well Connected"

            x = round(scale_coord(pos[node][0], min_x, max_x, 800, pad=70), 1)
            y = round(scale_coord(pos[node][1], min_y, max_y, 500, pad=50), 1)

            nodes_data.append({
                "id": node,
                "degree": deg,
                "centrality": round(cent, 3),
                "clustering": round(clust, 3),
                "isolation_score": iso_score,
                "status": status,
                "x": x,
                "y": y
            })

        edges_data = []
        for u, v, data in G.edges(data=True):
            edges_data.append({
                "source": u,
                "target": v,
                "weight": data.get("weight", 1.0)
            })

        avg_clustering = nx.average_clustering(G) if len(G) > 0 else 0.0
        density = nx.density(G)

        summary = {
            "total_nodes": G.number_of_nodes(),
            "total_edges": G.number_of_edges(),
            "isolated_nodes_count": isolated_count,
            "peripheral_nodes_count": peripheral_count,
            "connected_nodes_count": G.number_of_nodes() - isolated_count - peripheral_count,
            "average_clustering": round(avg_clustering, 3),
            "density": round(density, 3),
            "disclaimer": "Graph insights use voluntary/anonymized interaction signals and are intended only as an early-support indicator."
        }

        return {
            "nodes": nodes_data,
            "edges": edges_data,
            "summary": summary
        }

# Global social graph instance
social_graph_instance = SocialInteractionGraph()
