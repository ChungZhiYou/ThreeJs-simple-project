from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static folder
app.mount("/models", StaticFiles(directory="models"), name="models")

MODELS_DIR = Path("models")

@app.get("/models")
def list_models():
    model_folders = [f for f in MODELS_DIR.iterdir() if f.is_dir()]
    return [
        {
            "name": folder.name,
            "url": f"/models/{folder.name}/scene.gltf"
        }
        for folder in model_folders
        if (folder / "scene.gltf").exists()
    ]

# Serve static files manually if not using a full ASGI static handler
from fastapi.responses import FileResponse

@app.get("/models/{filename}")
def get_model_file(filename: str):
    file_path = MODELS_DIR / filename
    if file_path.exists():
        return FileResponse(file_path, media_type="model/gltf-binary")
    return {"error": "File not found"}
