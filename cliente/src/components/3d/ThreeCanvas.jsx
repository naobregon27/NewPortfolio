import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Menu3D from './Menu3D';
import CustomSphere from './CustomSphere';
import ParticleTransition from './ParticleTransition';
import PageTransition from './PageTransition';

const ThreeCanvas = ({ isOpen, isTransitioning }) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
        fov: 75,
        near: 0.1,
        far: 1000
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 10
      }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 5, 20]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Suspense fallback={null}>
        <Menu3D isOpen={isOpen} />
        <CustomSphere />
        <ParticleTransition />
        <PageTransition isTransitioning={isTransitioning} />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas; 