'use client';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Group } from 'three';
import { GLTF } from 'three-stdlib';

// removed top-level preload to avoid server-side invocation; we'll preload on the client inside the component

// Define the expected GLTF result structure for better type safety.
type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh | THREE.SkinnedMesh };
  materials: { [key: string]: THREE.Material };
};

interface ModelProps {
  modelUrl: string;
  scale?: number;
}

type TeacherModelProps = Record<string, never>;

const Model = ({ modelUrl, scale = 1.2 }: ModelProps) => {
  const group = useRef<Group | null>(null);

  // Use the GLTFResult type to get type-safe scene and animations
  const gltf = useGLTF(modelUrl) as unknown as GLTFResult;

  // Attach animations to the gltf.scene (safer than passing a ref which may be null initially)
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);

  // Play a relevant animation
  useEffect(() => {
    if (actions && names && names.length > 0) {
      const animationToPlay =
        names.find(name => name.toLowerCase().includes('explaining')) ||
        names.find(name => name.toLowerCase().includes('idle')) ||
        names.find(name => name.toLowerCase().includes('standing')) ||
        names[0];

      if (typeof animationToPlay === 'string' && actions[animationToPlay]) {
        actions[animationToPlay].reset().setLoop(THREE.LoopRepeat, Infinity).play();
      }
    }
  }, [actions, names]);

  // Center the model and set encoding for textures without mutating the cached scene
  // Also nudge the model upward so only the top-half is visible by default
  useEffect(() => {
    if (!group.current || !gltf.scene) return;

    // Ensure textures use sRGB encoding for correct colors
    gltf.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        const mat = obj.material as any;
        if (mat) {
          if (mat.map) {
            // use any-cast because typings may not expose SRGBEncoding in this workspace
            (mat.map as any).encoding = (THREE as any).SRGBEncoding || (THREE as any).sRGBEncoding;
          }
          if (mat.emissiveMap) {
            (mat.emissiveMap as any).encoding = (THREE as any).SRGBEncoding || (THREE as any).sRGBEncoding;
          }
          mat.needsUpdate = true;
        }
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    // Compute bounding box from the gltf.scene (do not mutate gltf.scene directly)
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Position the group to center the model
    group.current.position.set(-center.x, -center.y, -center.z);
    // Reverse nudge: push model down to focus on top half
    group.current.position.y -= size.y * 0.1; // adjusted factor reversed

  }, [gltf.scene]);

  return (
    <group ref={group} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const TeacherModel = ({}: TeacherModelProps) => {
  // Use the renamed model file placed in /public to avoid spaces and ensure same-origin loading
  const modelUrl = '/teacher_female_narration.glb';

  // Preload model only on client to keep any blob URLs alive where needed
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        (useGLTF as any).preload && (useGLTF as any).preload(modelUrl);
      } catch (e) {
        // ignore preload errors
      }
    }
  }, [modelUrl]);

  // Zoomed-in top-half view: normal canvas height
  const canvasStyle: React.CSSProperties = { height: '100%' };

  // Camera positioned for top-half zoomed view
  const cameraPosition = [0, 0.6, 1.6] as [number, number, number];
  const modelScale = 1.6;

  return (
    <div className="w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-transparent">
      <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <Canvas
          shadows
          camera={{ position: cameraPosition, fov: 45 }}
          style={canvasStyle}
          onCreated={(state) => {
            // some three.js typings in this project don't include newer renderer props;
            // use any-casts to set desired runtime properties safely
            try {
              (state.gl as any).outputEncoding = (THREE as any).SRGBEncoding || (THREE as any).sRGBEncoding;
              (state.gl as any).physicallyCorrectLights = true;
            } catch (e) {
              // ignore if renderer doesn't support these in this environment
            }
          }}
        >
          <ambientLight intensity={0.9} color="#ffffff" />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" castShadow />
          <directionalLight position={[-5, -5, -5]} intensity={0.7} color="#bde0fe" />

          <Suspense fallback={null}>
            <Model modelUrl={modelUrl} scale={modelScale} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            target={[0, 1.4, 0]}
            minDistance={1.2}
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
