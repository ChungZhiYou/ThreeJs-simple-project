// src/components/ModelViewer.jsx

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Box3, Vector3 } from 'three';

function normalizeModelSize(model, targetSize = 1) {
  const box = new Box3().setFromObject(model); // get bounding box
  const size = new Vector3();
  box.getSize(size); // get dimensions

  const maxDim = Math.max(size.x, size.y, size.z); // get largest dimension
  const scale = targetSize / maxDim; // scale to fit target size

  model.scale.setScalar(scale); // uniformly scale the model

  // Optional: center the model
  const center = new Vector3();
  box.getCenter(center);
  model.position.sub(center.multiplyScalar(scale));
}

const ModelViewer = ({ modelPath }) => {
  const mountRef = useRef(null);
  console.log(modelPath)

  useEffect(() => {
    if (!modelPath) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / (window.innerHeight*0.7), 0.0001, 5000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new OrbitControls( camera, renderer.domElement );

    // renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setSize(window.innerWidth, window.innerHeight*0.7)
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xa4c1ed);
    const light = new THREE.AmbientLight(0x404040, 10);
    scene.add(light);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(1,1,1)
    directionalLight.castShadow = true
    scene.add(directionalLight)


    const loader = new GLTFLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      modelPath,
      (gltf) => {
        normalizeModelSize(gltf.scene,10)
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        gltf.scene.traverse((child) => {
            child.frustumCulled = false;
            if (child.isMesh && child.material.map) {
                child.material.map.encoding = THREE.sRGBEncoding;
                child.material.map.minFilter = THREE.LinearMipMapLinearFilter;
                child.material.map.magFilter = THREE.LinearFilter;
                child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
                child.material.needsUpdate = true;
            }
          });
          console.log(gltf)
        scene.add(gltf.scene);
        animate();
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    camera.position.z = 15;
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      renderer.render(scene, camera);
    };

    return () => {
        if (mountRef.current){
            while (mountRef.current.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild);
            }
        }
    };
  }, [modelPath]);

  return <div id="render" ref={mountRef} style={{ width: "100%", height: "80%" }} />;
};

export default ModelViewer;
