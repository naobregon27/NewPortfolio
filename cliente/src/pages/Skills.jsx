import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Three.js', level: 75 },
        { name: 'Vue.js', level: 70 },
        { name: 'Next.js', level: 85 },
        { name: 'Framer Motion', level: 80 },
      ],
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 95 },
        { name: 'Express.js', level: 90 },
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'REST APIs', level: 95 },
        { name: 'GraphQL', level: 75 },
        { name: 'JWT', level: 90 },
        { name: 'Socket.io', level: 85 },
      ],
    },
    {
      name: 'Herramientas & Otros',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS S3', level: 80 },
        { name: 'DigitalOcean', level: 70 },
        { name: 'Web Scraping', level: 75 },
        { name: 'Metodologías Ágiles', level: 85 },
        { name: 'Figma', level: 80 },
        { name: 'Bootstrap', level: 85 },
      ],
    },
  ];

  const softSkills = [
    {
      name: 'Comunicación',
      description: 'Excelente capacidad para comunicar ideas y conceptos técnicos.',
    },
    {
      name: 'Trabajo en Equipo',
      description: 'Experiencia en colaboración efectiva en equipos multidisciplinarios.',
    },
    {
      name: 'Resolución de Problemas',
      description: 'Habilidad para analizar y resolver problemas complejos.',
    },
    {
      name: 'Aprendizaje Continuo',
      description: 'Compromiso con el aprendizaje y la mejora constante.',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Habilidades
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un resumen de mis habilidades técnicas y blandas.
          </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-8 text-gray-900">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                <div key={skill.name} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900">{skill.name}</span>
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
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
            Habilidades Blandas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">{skill.name}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills; 