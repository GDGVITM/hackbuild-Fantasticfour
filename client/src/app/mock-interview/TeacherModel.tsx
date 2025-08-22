'use client';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Group } from 'three';
import { GLTF } from 'three-stdlib';

// Define the expected GLTF result structure for better type safety.
type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh | THREE.SkinnedMesh };
  materials: { [key: string]: THREE.Material };
};

interface ModelProps {
  modelUrl: string;
  scale?: number;
}

interface TeacherModelProps {
  topHalf?: boolean; // when true, crop to show only top half
}

const Model = ({ modelUrl, scale = 1.2 }: ModelProps) => {
  // Use a type-safe ref for the Group
  const group = useRef<Group | null>(null);

  // Use the GLTFResult type to get type-safe scene and animations
  const { scene, animations } = useGLTF(modelUrl) as unknown as GLTFResult;
  
  // The useAnimations hook returns an object with an `actions` map and `names` array
  const { actions, names } = useAnimations(animations, group);

  // Effect to play the most relevant animation when the component loads
  useEffect(() => {
    if (actions && names && names.length > 0) {
      // Prioritize "explaining" or "idle" animations, otherwise play the first one
      const animationToPlay = 
        names.find(name => name.toLowerCase().includes('explaining')) || 
        names.find(name => name.toLowerCase().includes('idle')) || 
        names.find(name => name.toLowerCase().includes('standing')) || 
        names[0];

      if (actions[animationToPlay]) {
        actions[animationToPlay].reset().setLoop(THREE.LoopRepeat, Infinity).play();
      }
    }
  }, [actions, names]);

  // Effect to center the model and adjust its vertical position
  useEffect(() => {
    if (scene) {
      // Compute the bounding box to find the center
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      
      // Subtract the center to position the model at the origin
      scene.position.sub(center); 
      
      // Adjust vertical position to be slightly lower
      scene.position.y -= 0.4;
    }
  }, [scene]);

  return <primitive ref={group} object={scene} dispose={null} scale={scale} />;
};

const TeacherModel = ({ topHalf = false }: TeacherModelProps) => {
  const modelUrl = '/Teacher Female Narration 01 (1).glb';

  // If topHalf is true we will crop the bottom part by placing the canvas
  // inside an overflow-hidden container and making the canvas taller and
  // translating it upwards by 60% so only the top portion is visible.
  const canvasStyle: React.CSSProperties | undefined = topHalf
    ? { height: '220%', transform: 'translateY(-60%)' }
    : undefined;

  const cameraPosition = topHalf ? [0, 0, 1.6] : [0, 0, 2.5];
  const modelScale = topHalf ? 1.8 : 1.2;

  return (
    <div className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xlshadow-2xl overflow-hidden">
      {/* Background behind the 3D canvas when visible */}
      <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <Canvas camera={{ position: cameraPosition as [number, number, number], fov: 45 }} style={canvasStyle}>
          {/* Lights for a good presentation */}
          <ambientLight intensity={0.9} color="#ffffff" />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.7} color="#bde0fe" />
          
          {/* Suspense handles the loading state of the GLTF model */}
          <Suspense fallback={null}>
            <Model modelUrl={modelUrl} scale={modelScale} />
          </Suspense>

          {/* OrbitControls allows for camera interaction */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            target={[0, 0, 0]}
            minDistance={2}
            maxDistance={5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default TeacherModel;
