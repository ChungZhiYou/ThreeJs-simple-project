import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/(window.innerHeight*0.6))
const renderer = new THREE.WebGLRenderer({antialias: true})
const controls = new OrbitControls( camera, renderer.domElement );
renderer.setSize(window.innerWidth, window.innerHeight*0.6)

const ThreeRenderer = ({ width, height, length, radius, shape }) => {

  const cubeRef = useRef(null);
  const renderRef = useRef(null);

  // Setup scene and renderer once
  useEffect(() => {
    renderRef.current.innerHTML = '';
    renderRef.current.appendChild(renderer.domElement);

    camera.position.z = 10;

    const animate = () => {
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
        controls.update();
      }
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);
  }, []);

  // Update cube when props change
  useEffect(() => {
    scene.clear(); // clear previous objects

    if (shape === 'sphere') {
      const geometry = new THREE.SphereGeometry( radius, 32, 16 ); 
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 0.3, roughness: 0.5 });

      const cube = new THREE.Mesh(geometry, material);
      // cube.position.z = -5;
      cube.rotation.x = 0.5;
      cube.rotation.y = 0.2;

      cubeRef.current = cube;
      scene.add(cube);
    }
    if (shape === 'rectangle') {
      const geometry = new THREE.BoxGeometry(width, length, height);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 0.3, roughness: 0.5 });
      const cube = new THREE.Mesh(geometry, material);
      // cube.position.z = -5;
      cube.rotation.x = 0.5;
      cube.rotation.y = 0.2;

      cubeRef.current = cube;
      scene.add(cube);
    }
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    controls.update();


    // You can add circle logic similarly here
  }, [width, height, length, radius, shape]);

  return (
    <div id="render" ref={renderRef} />
  )
}

export default ThreeRenderer