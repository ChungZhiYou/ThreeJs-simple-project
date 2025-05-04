import React, { useState } from 'react'
import RenderForm from './components/RenderForm'
import FetchModels from './components/FetchModels'

const App = () => {
  const [page, setPage] = useState("GeometrRender")

  return (
    <div style={{ marginTop: '50px' , marginLeft: '200px', marginRight: '200px'}}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
        <a href="#" onClick={() => page === "GeometryRender" ? setPage("ModelLoader") : setPage("GeometryRender")}>{page === "GeometryRender" ? "Go to load models" : "Go to geometry render"}</a>
      </div>
      {page === "GeometryRender" ? 
        <RenderForm setPage={setPage}/>: 
        <FetchModels setPage={setPage}/>}
    </div>
  )
}

export default App