import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import * as THREE from 'three'

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight)

// const renderer = new THREE.WebGLRenderer({antialias: true})
// renderer.setSize(window.innerWidth, window.innerHeight)

// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color: 0xff0000})
// const cube = new THREE.Mesh(geometry, material)
// cube.position.z = -5

// scene.add(cube)
// renderer.render(scene, camera)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
