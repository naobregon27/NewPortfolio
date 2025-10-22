import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Desarrollador Full Stack Senior',
      company: 'Empresa 1',
      period: '2020 - Presente',
      description: [
        'Lideré el desarrollo de aplicaciones web utilizando React y Node.js',
        'Implementé arquitecturas escalables y optimizadas',
        'Mentoré a desarrolladores junior y realizé code reviews',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    },
    {
      id: 2,
      title: 'Desarrollador Frontend',
      company: 'Empresa 2',
      period: '2018 - 2020',
      description: [
        'Desarrollé interfaces de usuario responsivas y accesibles',
        'Implementé animaciones y transiciones fluidas',
        'Colaboré en la optimización del rendimiento',
      ],
      technologies: ['React', 'TypeScript', 'Sass', 'Webpack'],
    },
    // Agrega más experiencias aquí
  ];

  const certifications = [
    {
      id: 1,
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2022',
      link: 'https://aws.amazon.com/certification/',
    },
    {
      id: 2,
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2021',
      link: 'https://www.scrum.org/',
    },
    // Agrega más certificaciones aquí
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
            Experiencia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mi trayectoria profesional y certificaciones.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2" />

              {/* Content */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <span className="text-primary font-medium">
                    {experience.period}
                  </span>
                </div>
                <h4 className="text-lg text-gray-600 mb-4">{experience.company}</h4>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {experience.description.map((item, i) => (
                    <li key={i} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Certificaciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-gray-600 mb-2">{cert.issuer}</p>
                <p className="text-primary font-medium mb-4">{cert.date}</p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center"
                >
                  Ver certificación
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience; 