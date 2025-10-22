import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  uniform float uProgress;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    float distortion = sin(pos.x * 2.0 + uTime) * 
                      cos(pos.y * 2.0 + uTime) * 
                      sin(uProgress * 3.14159);
    
    pos.z += distortion * 2.0;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  uniform float uProgress;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  void main() {
    vec3 color1 = uColor1;
    vec3 color2 = uColor2;
    
    // Patrón de energía
    float energyPattern = abs(sin(vUv.x * 20.0 + uTime * 3.0)) * 
                         abs(cos(vUv.y * 20.0 - uTime * 2.0));
    
    // Color base con gradiente
    vec3 baseColor = mix(color1, color2, vUv.y + sin(vUv.x * 5.0 + uTime) * 0.2);
    
    // Efecto de energía brillante
    vec3 energyColor = mix(baseColor, vec3(1.0), energyPattern * 0.5);
    
    // Efecto de transición
    float transitionEdge = smoothstep(uProgress - 0.1, uProgress + 0.1, vUv.x);
    vec3 finalColor = mix(energyColor, vec3(1.0), transitionEdge * 0.8);
    
    // Destello adicional
    float sparkle = pow(sin(vUv.x * 50.0 + uTime) * 
                       sin(vUv.y * 50.0 + uTime), 10.0);
    finalColor += vec3(sparkle) * 0.5;
    
    gl_FragColor = vec4(finalColor, mix(0.8, 0.0, transitionEdge));
  }
`;

const PageTransition = ({ isTransitioning }) => {
  const { camera } = useThree();
  const meshRef = useRef();
  const materialRef = useRef();
  const progressRef = useRef(0);
  const targetRotationRef = useRef(0);
  const initialCameraRotation = useRef(null);

  useEffect(() => {
    if (isTransitioning) {
      progressRef.current = 0;
      initialCameraRotation.current = camera.rotation.y;
      targetRotationRef.current = initialCameraRotation.current + Math.PI * 2;
    }
  }, [isTransitioning, camera]);

  useFrame((state) => {
    if (!materialRef.current) return;

    const time = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = time;

    if (isTransitioning) {
      // Progreso de la transición
      progressRef.current = Math.min(progressRef.current + 0.02, 1);
      materialRef.current.uniforms.uProgress.value = progressRef.current;

      // Rotación de cámara
      if (initialCameraRotation.current !== null) {
        camera.rotation.y = THREE.MathUtils.lerp(
          initialCameraRotation.current,
          targetRotationRef.current,
          progressRef.current
        );
      }
    } else {
      progressRef.current = Math.max(progressRef.current - 0.02, 0);
      materialRef.current.uniforms.uProgress.value = progressRef.current;
    }

    // Movimiento ondulante constante
    if (meshRef.current) {
      meshRef.current.position.z = Math.sin(time * 0.5) * 0.2 - 1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uColor1: { value: new THREE.Vector3(0.388, 0.388, 0.980) },
          uColor2: { value: new THREE.Vector3(0.925, 0.286, 0.600) }
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default PageTransition; 