import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  
  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D pointTexture;
  varying vec3 vColor;
  
  void main() {
    gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
  }
`;

const ParticleTransition = () => {
  const particlesRef = useRef();
  const materialRef = useRef();
  const location = useLocation();
  const particleCount = 1000;

  useEffect(() => {
    if (!particlesRef.current) return;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Posiciones aleatorias en forma de esfera
      const radius = 2;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(theta);

      // Colores degradados
      const mixFactor = i / particleCount;
      color.setHSL(mixFactor * 0.3 + 0.5, 0.9, 0.6);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Tamaños aleatorios
      sizes[i] = Math.random() * 20 + 5;
    }

    particlesRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesRef.current.geometry.setAttribute(
      'customColor',
      new THREE.BufferAttribute(colors, 3)
    );
    particlesRef.current.geometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizes, 1)
    );
  }, []);

  useEffect(() => {
    // Efecto de transición cuando cambia la ruta
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position;
    const count = positions.count;
    const radius = 2;

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      positions.setXYZ(
        i,
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta)
      );
    }

    positions.needsUpdate = true;
  }, [location]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position;
    const count = positions.count;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Movimiento ondulatorio
      positions.array[ix] += Math.sin(time + positions.array[iy]) * 0.01;
      positions.array[iy] += Math.cos(time + positions.array[ix]) * 0.01;
      positions.array[iz] += Math.sin(time + positions.array[iz]) * 0.01;
    }

    positions.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          pointTexture: {
            value: new THREE.TextureLoader().load('/particle.png')
          }
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleTransition; 