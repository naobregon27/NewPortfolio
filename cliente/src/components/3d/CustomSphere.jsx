import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vEyeVector;
  
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    // Efecto de ondulación para el torus
    vec3 pos = position;
    float displacement = sin(pos.x * 3.0 + uTime) * 
                        sin(pos.y * 2.0 + uTime) * 
                        sin(pos.z * 4.0 + uTime) * 0.2;
    
    pos += normal * displacement;
    
    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vEyeVector = normalize(worldPosition.xyz - cameraPosition);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vEyeVector;
  
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec2 uMouse;
  
  void main() {
    // Efecto de refracción
    float fresnelTerm = pow(1.0 + dot(vEyeVector, vNormal), 3.0);
    
    // Gradiente base mejorado para torus
    vec3 color = mix(uColor1, uColor2, vUv.x + sin(vUv.y * 12.0 + uTime) * 0.1);
    
    // Efecto de energía pulsante
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    vec3 pulseColor = mix(color, vec3(1.0), pulse * 0.15);
    
    // Efecto de líneas de energía
    float linePattern = abs(sin(vUv.y * 60.0 + uTime * 2.0)) * 
                       abs(sin(vUv.x * 60.0 - uTime * 2.0));
    vec3 lineColor = mix(pulseColor, vec3(1.0), linePattern * 0.15);
    
    // Efecto de brillo en los bordes
    vec3 finalColor = mix(lineColor, vec3(1.0), fresnelTerm * 0.2);
    
    // Interacción con el mouse mejorada
    float dist = length(vUv - uMouse);
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    finalColor = mix(finalColor, finalColor * 1.2, glow * 0.2);
    
    // Efecto de destello
    float sparkle = pow(sin(vUv.x * 100.0 + uTime) * 
                       sin(vUv.y * 100.0 + uTime), 30.0) * 0.3;
    finalColor += vec3(sparkle);
    
    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

const CustomTorus = ({ position, scale, color1 = [0.388, 0.388, 0.980], color2 = [0.925, 0.286, 0.600] }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!materialRef.current) return;

    // Actualizar uniforms
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value = mouseRef.current;

    // Rotación dinámica más suave para el torus
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  const handlePointerMove = (event) => {
    const { uv } = event;
    mouseRef.current = { x: uv.x, y: uv.y };
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerMove={handlePointerMove}
    >
      <torusGeometry args={[1.5, 0.5, 64, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Vector3(...color1) },
          uColor2: { value: new THREE.Vector3(...color2) },
          uMouse: { value: new THREE.Vector2(0, 0) }
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default CustomTorus; 