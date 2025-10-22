import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ onMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'Sobre Mí' },
    { path: '/projects', label: 'Proyectos' },
    { path: '/experience', label: 'Experiencia' },
    { path: '/skills', label: 'Habilidades' },
    { path: '/contact', label: 'Contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'navbar-glass shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-xl md:text-2xl font-bold gradient-text">
           <span className="hidden sm:inline">Developer ╩ </span>Nahuel Obregón 
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <div className="flex space-x-3 lg:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Profile Image */}
            <motion.div
              className="relative"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden cursor-pointer group">
                <img
                  src="/WhatsApp Image 2023-09-13 at 10.04.25.jpeg"
                  alt="Nahuel Obregón"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400 rounded-full transition-all duration-300" />
              </div>

              {/* Hover Tooltip */}
              {isProfileHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-white/20 min-w-[240px]">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
                        <img
                          src="/WhatsApp Image 2023-09-13 at 10.04.25.jpeg"
                          alt="Nahuel Obregón"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm">Nahuel Obregón</h3>
                      <p className="text-gray-600 text-xs">Full Stack Developer</p>
                      <div className="mt-2 flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">Disponible</span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-l border-t border-white/20"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Mobile Profile & Menu */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Profile Image */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer group">
                <img
                  src="/WhatsApp Image 2023-09-13 at 10.04.25.jpeg"
                  alt="Nahuel Obregón"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg glass-card"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 mb-4 glass-card rounded-xl p-4"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-l-4 border-purple-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 