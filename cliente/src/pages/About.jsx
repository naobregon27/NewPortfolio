import { motion } from 'framer-motion';
import { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const frontendSkills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Three.js', level: 75 },
    { name: 'Vue.js', level: 70 },
    { name: 'Next.js', level: 85 },
    { name: 'Framer Motion', level: 80 },
  ];

  const backendSkills = [
    { name: 'Node.js', level: 95 },
    { name: 'Express.js', level: 90 },
    { name: 'MongoDB', level: 85 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'REST APIs', level: 95 },
    { name: 'GraphQL', level: 75 },
    { name: 'JWT', level: 90 },
    { name: 'Socket.io', level: 85 },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre Mí
          </h1>
          <p className="text-xl text-gray-600">
            Desarrollador Full Stack apasionado por crear experiencias web únicas
            y memorables.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Mi Historia</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Con más de 4 años de experiencia en el desarrollo web, he
                trabajado en diversos proyectos que van desde aplicaciones web
                hasta plataformas complejas.
              </p>
              <p>
              Mi pasión por la tecnología nació de niño, fascinado por los videojuegos. Esa curiosidad por cómo funcionaban me llevó a desarmar equipos y experimentar. Pronto, no era solo jugar, sino crear y entender la lógica detrás de todo. Esa chispa inicial sigue encendida, impulsándome a explorar y aprender constantemente en este increíble mundo tecnológico.
              </p>
              <p>
                Me especializo en crear interfaces de usuario intuitivas y
                experiencias digitales memorables, combinando diseño y
                funcionalidad.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Mis Habilidades</h2>
            
            {/* Skills Tabs */}
            <div className="mb-8">
              <div className="relative flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('frontend')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === 'frontend'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Frontend</span>
                </button>
                <button
                  onClick={() => setActiveTab('backend')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === 'backend'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  <span>Backend</span>
                </button>
              </div>
            </div>

            {/* Skills Stats */}
            <motion.div
              key={`stats-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {activeTab === 'frontend' ? 'Habilidades Frontend' : 'Habilidades Backend'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {activeTab === 'frontend' ? frontendSkills.length : backendSkills.length} tecnologías dominadas
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(
                      (activeTab === 'frontend' ? frontendSkills : backendSkills)
                        .reduce((acc, skill) => acc + skill.level, 0) / 
                      (activeTab === 'frontend' ? frontendSkills : backendSkills).length
                    )}%
                  </div>
                  <p className="text-xs text-gray-500">Promedio</p>
                </div>
              </div>
            </motion.div>

            {/* Skills Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {(activeTab === 'frontend' ? frontendSkills : backendSkills).map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Mis Valores y Filosofía
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Innovación</h3>
              <p className="text-gray-600">
                Siempre buscando nuevas formas de resolver problemas y crear
                experiencias únicas.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Calidad</h3>
              <p className="text-gray-600">
                Comprometido con la excelencia en cada línea de código y cada
                detalle del diseño.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Colaboración</h3>
              <p className="text-gray-600">
                Creo en el poder del trabajo en equipo y la comunicación efectiva.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 