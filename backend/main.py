from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """Check if the graph is a Directed Acyclic Graph using DFS cycle detection"""
    if not nodes:
        return True

    # Build adjacency list
    graph = {node['id']: [] for node in nodes}

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target and source in graph and target in graph:
            graph[source].append(target)

    # Detect cycles using DFS with three colors
    # WHITE (0) = unvisited, GRAY (1) = visiting, BLACK (2) = visited
    color = {node_id: 0 for node_id in graph}

    def dfs(node):
        color[node] = 1  # Mark as visiting (GRAY)

        for neighbor in graph.get(node, []):
            if color[neighbor] == 1:
                # Back edge found - cycle detected
                return False
            if color[neighbor] == 0:
                # Unvisited node - continue DFS
                if not dfs(neighbor):
                    return False

        color[node] = 2  # Mark as visited (BLACK)
        return True

    # Check all nodes for cycles
    for node in graph:
        if color[node] == 0:
            if not dfs(node):
                return False

    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(nodes: str = Form(...), edges: str = Form(...)):
    try:
        nodes_data = json.loads(nodes) if nodes else []
        edges_data = json.loads(edges) if edges else []
    except (json.JSONDecodeError, TypeError):
        return {'error': 'Invalid JSON format'}

    return {
        'num_nodes': len(nodes_data),
        'num_edges': len(edges_data),
        'is_dag': is_dag(nodes_data, edges_data)
    }

