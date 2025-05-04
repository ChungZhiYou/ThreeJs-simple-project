import React, { useEffect, useState } from "react";
import ModelViewer from "./ModelViewer";

function FetchModels({setPage}) {
  const [models, setModels] = useState([]);
  const [selectedModelUrl, setSelectedModelUrl] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/models")
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error("Error fetching models:", err));
  }, []);

  return (
    <div >
      {/* <a style={{marginLeft:'10px'}} onClick={() => {setPage("GeometryRender")}}>Go to geometry render</a> */}
      <div style={{ textAlign: 'center'}}>
        <h1>3D Model Viewer</h1>

        <div style={{ marginBottom: "1rem" }}>
            <label>Select a model:</label>
            <select
            onChange={(e) => setSelectedModelUrl(e.target.value)}
            style={{ marginLeft: "1rem" }}
            >
            <option value="">-- Choose --</option>
            {models.map((model) => (
                <option key={model.name} value={`http://localhost:8000${model.url}`}>
                {model.name}
                </option>
            ))}
            </select>
        </div>
      </div>

      {selectedModelUrl && (
        <ModelViewer modelPath={selectedModelUrl} />
      )}
    </div>
  );
}

export default FetchModels;