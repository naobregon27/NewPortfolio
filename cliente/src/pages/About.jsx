import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Three.js', level: 75 },
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
            <div className="space-y-6">
              {skills.map((skill, index) => (
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
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
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