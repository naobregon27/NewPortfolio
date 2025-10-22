import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useLocation, useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const MenuItem = ({ label, path, position, isActive, onSelect, index }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const time = useRef(0);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    time.current += 0.05;
    
    // Efecto de flotación
    meshRef.current.position.y = position[1] + Math.sin(time.current + index) * 0.1;
    
    // Rotación cuando está hover
    if (hovered) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        Math.PI * 0.1,
        0.1
      );
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1)
      );
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        0,
        0.1
      );
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1)
      );
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect(path)}
    >
      <mesh>
        <planeGeometry args={[4, 0.8]} />
        <meshStandardMaterial
          color={isActive ? "#8b5cf6" : "#6366f1"}
          transparent
          opacity={0.9}
          metalness={0.5}
          roughness={0.2}
          emissive={hovered ? "#4c1d95" : "#000000"}
          emissiveIntensity={hovered ? 2 : 0}
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.4}
        color={hovered ? "#ffffff" : "#e2e8f0"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
};

const Menu3D = ({ isOpen }) => {
  const { camera } = useThree();
  const location = useLocation();
  const navigate = useNavigate();
  const groupRef = useRef();

  const menuItems = [
    { label: 'INICIO', path: '/' },
    { label: 'SOBRE MÍ', path: '/about' },
    { label: 'PROYECTOS', path: '/projects' },
    { label: 'EXPERIENCIA', path: '/experience' },
    { label: 'HABILIDADES', path: '/skills' },
    { label: 'CONTACTO', path: '/contact' },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;

    // Animación de apertura/cierre del menú
    const targetY = isOpen ? 0 : -10;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1
    );

    // Rotación suave del menú
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  const handleMenuSelect = (path) => {
    navigate(path);
  };

  return (
    <group 
      ref={groupRef} 
      position={[0, isOpen ? 0 : -20, -2]} 
      scale={[0.8, 0.8, 0.8]}
      rotation={[0, 0, 0]}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={item.path}
          label={item.label}
          path={item.path}
          position={[0, 3 - index * 1.2, 0]}
          isActive={location.pathname === item.path}
          onSelect={handleMenuSelect}
          index={index}
        />
      ))}
    </group>
  );
};

export default Menu3D;