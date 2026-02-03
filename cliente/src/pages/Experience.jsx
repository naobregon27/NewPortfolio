import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Full-Stack Developer (Freelance)',
      company: 'Independiente',
      period: 'May 2021 - Actualidad',
      location: 'Goya, Corrientes, Argentina',
      description: [
        'Desarrollador Full Stack con más de 3 años de experiencia, con sólidos conocimientos y en constante capacitación',
        'Especializado en desarrollo de aplicaciones web completas y sistemas administrativos',
        'Trabajo remoto con clientes nacionales e internacionales',
        'Desarrollo de e-commerce, sistemas de laboratorios, colegios y sistemas administrativos en general'
      ],
      technologies: ['JavaScript', 'React.js', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'TypeScript', 'Nest.js', 'Tailwind CSS', 'Redux', 'Docker', 'AWS S3', 'DigitalOcean', 'Web Sockets', 'API REST', 'Figma', 'Bootstrap', 'Cloudinary', 'Web Scraping', 'Metodologías Ágiles'],
    },
    {
      id: 2,
      title: 'Full-Stack Developer',
      company: 'Bet30 - Casinos Virtuales',
      period: 'May 2025 - Sep 2025',
      location: 'Remoto',
      description: [
        'Programación y Marketing en casino virtual',
        'Desarrollo de programas administrativos y control de flujo de trabajo',
        'Métricas de clientes y desarrollo de landings de publicidad',
        'Integración de programas con Kommo CRM'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Kommo CRM', 'Marketing Digital', 'Analytics'],
    },
    {
      id: 3,
      title: 'Full-Stack Developer',
      company: 'Dennex Tech - Gastronomía',
      period: 'Feb 2025 - May 2025',
      location: 'Remoto',
      description: [
        'Trabajo autónomo para empresa de tecnología de soluciones gastronómicas en restaurantes',
        'Desarrollo de sistemas especializados para el sector gastronómico',
        'Proyectos varios de automatización y gestión'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Sistemas Gastronómicos'],
    },
    {
      id: 4,
      title: 'Full-Stack Developer',
      company: 'eCommerce Chile Compra',
      period: '2023 - 2024',
      location: 'Remoto',
      description: [
        'Trabajando para proyectos varios dentro del ecommerce Chile Compras',
        'Desarrollo y mantenimiento de plataformas de comercio electrónico',
        'Optimización de procesos de compra y pagos'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'eCommerce', 'Pagos', 'Chile'],
    },
    {
      id: 5,
      title: 'Full-Stack Developer',
      company: 'Proyectos Varios (Autónomo)',
      period: '2022 - 2023',
      location: 'Goya, Corrientes, Argentina',
      description: [
        'Un año de manera intermitente como Full-Stack en proyectos varios como trabajador autónomo y remoto',
        'Sistemas para Laboratorios',
        'Sistemas para Colegios',
        'Sistemas Administrativos en General'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Sistemas Administrativos', 'Laboratorios', 'Educación'],
      reference: {
        name: 'Juan Lamberti',
        contact: '+54 9351 6549055',
        email: 'juan.lamberti@gmail.com'
      }
    }
  ];

  const certifications = [
    {
      id: 1,
      title: 'Full Stack Web Developer',
      issuer: 'Henry Bootcamp',
      date: '2024',
      type: 'Bootcamp',
      description: 'Cursado teórico-práctico intensivo en desarrollo web full stack',
      link: 'https://certificates.soyhenry.com/new-cert?id=6ce47b868dba7afd5bab64756e3f60b0a29d1f6fbf7743987c5e129b18d59f0e',
    },
    {
      id: 2,
      title: 'Licenciatura en Administración de Empresas',
      issuer: 'UADE - Universidad Argentina de la Empresa',
      date: '2011 - 2013',
      type: 'Universidad',
      description: 'CABA, Argentina',
      location: 'Buenos Aires, Argentina'
    },
    {
      id: 3,
      title: 'Contador Público',
      issuer: 'UADE - Universidad Argentina de la Empresa',
      date: '2011 - 2013',
      type: 'Universidad',
      description: 'CABA, Argentina',
      location: 'Buenos Aires, Argentina'
    },
    {
      id: 4,
      title: 'Bachillerato en Auxiliar en Administración de Empresas',
      issuer: 'Instituto Damasa Zelaya de Saavedra',
      date: '2010',
      type: 'Secundario',
      description: 'Terminado en 2010',
      location: 'CABA, Argentina'
    }
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
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{experience.title}</h3>
                    <h4 className="text-lg text-primary font-semibold mb-1">{experience.company}</h4>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {experience.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {experience.period}
                    </span>
                  </div>
                </div>
                
                <ul className="list-disc list-inside space-y-2 mb-6">
                  {experience.description.map((item, i) => (
                    <li key={i} className="text-gray-600 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">Tecnologías utilizadas:</h5>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-teal-500/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {experience.reference && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Referencia:</h5>
                    <p className="text-sm text-gray-600">
                      <strong>{experience.reference.name}</strong><br />
                      📞 {experience.reference.contact}<br />
                      📧 {experience.reference.email}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Educación y Certificaciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cert.type === 'Bootcamp' 
                          ? 'bg-blue-100 text-blue-800' 
                          : cert.type === 'Universidad'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {cert.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.title}</h3>
                    <p className="text-primary font-semibold mb-1">{cert.issuer}</p>
                    <p className="text-gray-600 text-sm mb-2">{cert.description}</p>
                    {cert.location && (
                      <p className="text-gray-500 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {cert.location}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {cert.date}
                    </span>
                  </div>
                </div>
                
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-teal-500 font-medium transition-colors"
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
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience; 