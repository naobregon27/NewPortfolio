import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Menu3D from '../components/3d/Menu3D';
import PageTransition from '../components/3d/PageTransition';
import CustomSphere from '../components/3d/CustomSphere';
import ThreeCanvas from '../components/3d/ThreeCanvas';

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-dark-900 text-white">
      {/* Three.js Canvas */}
      <ThreeCanvas isOpen={isMenuOpen} isTransitioning={isTransitioning} />
      
      {/* Main Content */}
      <div className="relative z-20">
        <Navbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
        
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout; 