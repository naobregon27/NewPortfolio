import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [openModalId, setOpenModalId] = useState(null);

  const handlePrevImage = (projectId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: prev[projectId] > 0 ? prev[projectId] - 1 : projects.find(p => p.id === projectId).images.length - 1
    }));
  };

  const handleNextImage = (projectId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: prev[projectId] < projects.find(p => p.id === projectId).images.length - 1 ? prev[projectId] + 1 : 0
    }));
  };

  const projects = [
    {
      id: 1,
      title: 'Syncronizacion con Kommo',
      description: 'CRM, en donde syncroniza con tu cuenta de Kommo y te permite ver tus datos en un solo lugar. Importa contactos de Google atravez de autenticacion con Google y sincroniza con tu cuenta de Kommo.',
      image: '/komoo.jpeg',
      category: 'Proyectos Varios',
      technologies: ['React', 'Node.js', 'Redux', 'Tailwind', 'MongoDB'],
      link: 'https://crmkommo.netlify.app/',
      github: 'https://github.com/naobregon27/kommo',
    },
    {
      id: 2,
      title: 'Pagina Web Influence',
      description: 'Pagina web, hecha para un influence Español. Promocionando sus productos y servicios.',
      image: '/Page.jpeg',
      category: 'Proyectos Varios',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://boisterous-quokka-2d7e4d.netlify.app/',
      github: 'https://boisterous-quokka-2d7e4d.netlify.app/',
    },
    {
      id: 3,
      title: 'Cotizadora de panales solares con web en WordPress',
      description: 'Cotizadora, para una empresa chilena que pone panales solares en diferentes estados de chile, cotizando con diferentes variables eh importes de acuerdo a la region donde se situa el panel. Aperte hay una pagina web hecha en wordpress, en donde promociona su labor y los servicios que ofrece.',
      image: '/cotizadora.jpeg',
      category: 'Proyectos Varios',
      technologies: ['React', 'Node.js', 'PostgresSQL', 'Tailwind', 'Express', 'Redux'],
      link: 'https://effortless-unicorn-7eeff8.netlify.app/',
      github: 'https://github.com/naobregon27/Calculadora-Cotizador',
    },
    {
      id: 4,
      title: 'Tienda online',
      description: 'Tienda online, en donde el cliente puede ver los productos que ofrece la empresa, agregarlos al carrito y finalizar la compra. medios de pagos. Se puede ver el historial de compras, y el estado de las mismas. Se puede ver el detalle de los productos, y los comentarios de los mismos. Reistrarse en la tienda, y ver el historial de compras. Perfil Cliente',
      image: '/e-commerce.jpeg',
      category: 'Proyectos Varios',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Express', 'Tailwind', 'Redux'],
      link: 'https://tutienda-online.netlify.app/tienda-iphone-actualizada',
      github: 'https://github.com/naobregon27/tienda-frontend',
    },
    {
      id: 5,
      title: 'Tienda online e-commerce (Administrador y superAdmin)',
      description: 'Perfil Administrador, se puede ver el historial de compras, y el estado de las mismas. Se puede ver el detalle de los productos, y los comentarios de los mismos. Personas que se registran en la tiendas, ver los pedidos a realizar. Inventario de productos, agregar, editar, eliminar. Agregar categorias de productos. Agregar marcas de productos. Agregar proveedores de productos. Agregar clientes. Agregar usuarios. Agregar roles. Agregar permisos. Agregar notificaciones. Agregar banners. Agregar categorias de productos. Agregar marcas de productos. Agregar proveedores de productos. Agregar clientes. Agregar usuarios. Agregar roles. Agregar permisos. Agregar notificaciones. Agregar banners.',
      images: [
        '/ecommerAdmin1.jpeg',
        '/ecomerceAdmin2.jpeg',
        '/ecomerceAdmin3.jpeg',
        '/ecomerceAdmin4.jpeg',
        '/ecomerceAdmin5.jpeg',
        '/ecomerceadmin6.jpeg'
      ],
      category: 'Proyectos Varios',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Express', 'Tailwind', 'Redux', 'JWT', 'Express', 'Tailwind', 'Redux'],
      link: 'https://admine-commerce.netlify.app/',
      github: 'https://github.com/naobregon27/e.commerce-frontend-admin',
    },
    {
      id: 6,
      title: 'Spooty Fans',
      description: 'App web, en donde el cliente se puede llevar una buena experiencia. Subiendo su propias musica, y escuchando la musica de otros usuarios. Tambien se puede ver el perfil de los usuarios, y los seguidores de los mismos. Se puede seguir a otros usuarios, y a los que te siguen. Se puede ver el historial de reproduccion, y los favoritos de los usuarios. Se puede ver el top de usuarios, y los favoritos de los mismos. Se puede ver el top de canciones, y los favoritos de los mismos. Se puede ver el top de artistas, y los favoritos de los mismos. Se puede ver el top de albums, y los favoritos de los mismos. Se puede ver el top de playlists, y los favoritos de los mismos.',
      image: '/spootyfans.jpeg',
      category: 'App Web',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Express', 'Tailwind', 'Redux', 'JWT', 'Express', 'Tailwind', 'Redux', 'mercadopago', 'Autenticacion con google'  ],
      link: 'https://pf-spooty-fans-two.vercel.app/',
      github: 'https://github.com/naobregon27/PF-SpootyFans',
    },
    {
      id: 7,
      title: 'MSV Segurida e higiene laboral web',
      description: 'Una aplicación web moderna y completa diseñada para empresas del sector industrial que necesitan gestionar servicios de seguridad e higiene laboral. La plataforma conecta empresas con proveedores especializados, facilitando la contratación de auditorías, capacitaciones, trámites legales, y equipos de protección personal (EPP). <strong>Características Principales Sistema de Autenticación Completo:</strong> Registro e inicio de sesión con persistencia de datos Catálogo de Servicios: Auditorías de seguridad, capacitaciones, certificaciones ISO, planos técnicos, trámites legales y venta de EPP Panel de Mis Servicios: Gestión personalizada de contrataciones y seguimiento de proyectos Sistema de Contratación: Proceso completo desde selección hasta confirmación de servicios Interfaz Responsiva: Diseño moderno y adaptable a todos los dispositivos',
      image: '/MSV web.jpeg',
      category: 'App Web',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Express', 'Tailwind',  'Framer Motion', 'Axios', 'Redux Toolkit + Redux Persist (gestión de estado robusta)'],
      link: 'https://msvweb.netlify.app/',
      github: 'https://github.com/naobregon27/MSVweb',
    },
    {
      id: 8,
      title: 'MSV Segurida e higiene laboral web (Administrador)',
      description: 'Una aplicación web moderna y robusta diseñada para la gestión integral de servicios técnicos, que conecta administradores, técnicos y usuarios en un ecosistema digital completo. La aplicación facilita la coordinación de servicios, seguimiento de visitas técnicas, gestión de inventario y administración de cursos especializados. <strong>Características Principales:</strong> Sistema de Autenticación: Registro e inicio de sesión con persistencia de datos Catálogo de Servicios: Auditorías de seguridad, capacitaciones, certificaciones ISO, planos técnicos, trámites legales y venta de EPP Panel de Mis Servicios: Gestión personalizada de contrataciones y seguimiento de proyectos Sistema de Contratación: Proceso completo desde selección hasta confirmación de servicios Interfaz Responsiva: Diseño moderno y adaptable a todos los dispositivos ',
      image: '/MSVadmin.jpeg',
      category: 'App Web',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Express', 'Tailwind',  'Framer Motion', 'Axios', 'Redux Toolkit + Redux Persist (gestión de estado robusta)', 'Three.js + React Three Fiber ( visualizaciones 3D interactivas)'],
      link: 'https://msvadmin.netlify.app/',
      github: 'https://github.com/naobregon27/MSVFront',
    },
    {
      id: 9,
      title: 'Casino Virtual - Plataforma Verificada',
      description: 'Una plataforma de casino virtual completa desarrollada en JavaScript con múltiples juegos de azar, sistema de apuestas en tiempo real y gestión de usuarios. <strong>Características Principales:</strong> <strong>🎰 Juegos Disponibles:</strong> Blackjack, Ruleta, Póker, Tragaperras, Baccarat y Dados. <strong>💰 Sistema de Monedas Virtuales:</strong> Gestión completa de saldo, depósitos y retiros. <strong>🎲 Mecánicas de Juego:</strong> Algoritmos de probabilidad realistas, animaciones fluidas y efectos de sonido. <strong>👥 Gestión de Usuarios:</strong> Registro, autenticación, perfiles y historial de apuestas. <strong>📊 Panel Administrativo:</strong> Control de juegos, estadísticas de usuarios y gestión de premios. <strong>🎨 Interfaz Inmersiva:</strong> Diseño temático de casino con animaciones y transiciones suaves.',
      image: '/plataforma.jpeg',
      category: 'App Web',
      technologies: ['JavaScript', 'React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Canvas API', 'Web Audio API', 'Tailwind CSS', 'Framer Motion', 'JWT', 'Stripe API'],
      link: 'https://plataformaverificada.site/',
      github: 'https://github.com/naobregon27/casino-virtual',
    },
    {
      id: 10,
      title: 'Clínica Fisioterapia',
      description: 'Sistema integral de gestión desarrollado específicamente para clínicas de fisioterapia, diseñado para optimizar todas las operaciones administrativas, clínicas y financieras. La aplicación cubre desde la gestión de pacientes y sesiones terapéuticas hasta el control de pagos, facturación y reportes administrativos, proporcionando una solución completa y moderna para profesionales de la salud. <strong>Características Principales:</strong> Gestión integral de pacientes con historial médico completo, sistema de sesiones de fisioterapia con planilla diaria interactiva, gestión financiera y pagos con múltiples métodos, dashboard interactivo con métricas en tiempo real, panel de administración con sistema de roles, autenticación robusta con JWT, y exportación de reportes a Excel.',
      images: [
        '/WhatsApp Image 2025-12-05 at 10.53.06.jpeg',
        '/WhatsApp Image 2025-12-05 at 10.53.39.jpeg',
        '/WhatsApp Image 2025-12-05 at 10.54.44.jpeg'
      ],
      category: 'App Web',
      technologies: ['React', 'Vite', 'React Router', 'Redux Toolkit', 'Material-UI', 'Tailwind CSS', 'Framer Motion', 'React Hook Form', 'Yup', 'Axios', 'date-fns', 'XLSX', 'Recharts'],
      link: 'https://fisioterapiamiguel.netlify.app/dashboard',
      github: 'https://github.com/naobregon27?tab=repositories',
    },
    {
      id: 11,
      title: 'GameXperience',
      description: 'Plataforma web social completa diseñada para la comunidad gamer, que combina características de redes sociales modernas con funcionalidades específicas para gaming. La aplicación permite a los usuarios conectarse, formar comunidades, participar en eventos y torneos, gestionar billeteras virtuales, y comunicarse en tiempo real. <strong>Características Principales:</strong> Sistema de comunidades estilo Discord, chat en tiempo real con Socket.IO, sistema de eventos y torneos, billetera virtual con integración Mercado Pago, sistema de amistades, chat directo entre usuarios, notificaciones en tiempo real, y dashboard completo de usuario.',
      images: [
        '/WhatsApp Image 2025-12-05 at 18.24.07.jpeg',
        '/WhatsApp Image 2025-12-05 at 18.26.57.jpeg',
        '/WhatsApp Image 2025-12-05 at 18.27.10.jpeg',
        '/WhatsApp Image 2025-12-05 at 18.27.30.jpeg',
        '/WhatsApp Image 2025-12-05 at 18.28.31.jpeg',
        '/WhatsApp Image 2025-12-05 at 18.29.09.jpeg'
      ],
      category: 'App Web',
      technologies: ['React', 'Vite', 'React Router', 'Redux Toolkit', 'Redux Persist', 'Socket.IO', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'React Three Fiber', 'date-fns'],
      link: 'https://gamexperience.games/',
      github: 'https://github.com/naobregon27?tab=repositories',
    },
  ];

  const categories = [
 //   { id: 'all', name: 'Todos' },
    { id: 'Proyectos Varios', name: 'Proyectos Varios' },
    { id: 'App Web', name: 'App Web' },
 //   { id: 'mobile', name: 'Mobile' },
 //   { id: 'desktop', name: 'Desktop' },
  ];

  const filteredProjects = projects.filter(
    (project) => filter === 'all' || project.category === filter
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mis Proyectos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Una colección de mis trabajos más destacados y proyectos personales.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === category.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative aspect-video group">
                  {project.images ? (
                    <>
                      <img
                        src={project.images[currentImageIndex[project.id] || 0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex justify-between p-2 z-30">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handlePrevImage(project.id);
                          }}
                          className="bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors cursor-pointer"
                        >
                          ←
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleNextImage(project.id);
                          }}
                          className="bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors cursor-pointer"
                        >
                          →
                        </button>
                      </div>
                    </>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <div className="flex space-x-4 pointer-events-auto">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
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
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: project.description }}></p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.id === 8 || project.id === 10 || project.id === 11) && (
                    <button
                      onClick={() => setOpenModalId(project.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Ver Detalles Completos
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal MSV */}
      <AnimatePresence>
        {openModalId === 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setOpenModalId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">MSV Seguridad e Higiene Laboral</h2>
                  <button
                    onClick={() => setOpenModalId(null)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/90 mt-2">Panel Administrativo - Gestión Integral de Servicios Técnicos</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Características Destacadas */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    ✨ Características Destacadas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-500 text-lg">🔐</span>
                        <div>
                          <p className="font-medium text-gray-800">Sistema de autenticación robusto</p>
                          <p className="text-sm text-gray-600">Verificación por email y persistencia de datos</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-500 text-lg">📱</span>
                        <div>
                          <p className="font-medium text-gray-800">Diseño completamente responsive</p>
                          <p className="text-sm text-gray-600">Optimizado para todos los dispositivos</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-purple-500 text-lg">🎨</span>
                        <div>
                          <p className="font-medium text-gray-800">Interfaz moderna</p>
                          <p className="text-sm text-gray-600">Animaciones suaves y UX optimizada</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-orange-500 text-lg">📊</span>
                        <div>
                          <p className="font-medium text-gray-800">Dashboards interactivos</p>
                          <p className="text-sm text-gray-600">Métricas en tiempo real</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 text-lg">🔔</span>
                        <div>
                          <p className="font-medium text-gray-800">Sistema de notificaciones</p>
                          <p className="text-sm text-gray-600">Contextual y no intrusivo</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-indigo-500 text-lg">📋</span>
                        <div>
                          <p className="font-medium text-gray-800">Gestión de inventario</p>
                          <p className="text-sm text-gray-600">Alertas automáticas de stock</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-teal-500 text-lg">📈</span>
                        <div>
                          <p className="font-medium text-gray-800">Estadísticas avanzadas</p>
                          <p className="text-sm text-gray-600">Reportes detallados</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-pink-500 text-lg">🔄</span>
                        <div>
                          <p className="font-medium text-gray-800">Sincronización en tiempo real</p>
                          <p className="text-sm text-gray-600">Entre diferentes roles de usuario</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start space-x-3">
                    <span className="text-yellow-500 text-lg">📱</span>
                    <div>
                      <p className="font-medium text-gray-800">PWA ready</p>
                      <p className="text-sm text-gray-600">Configuración para aplicación móvil</p>
                    </div>
                  </div>
                </div>

                {/* Impacto y Valor */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    🎯 Impacto y Valor
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Esta aplicación demuestra competencias avanzadas en:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">Desarrollo full-stack con React moderno</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Arquitectura de software escalable y mantenible</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">UX/UI Design con enfoque en usabilidad</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">Gestión de estado compleja con Redux</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700">Optimización de rendimiento y buenas prácticas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span className="text-gray-700">Despliegue y DevOps con plataformas modernas</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tecnologías */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">🛠️ Tecnologías Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects.find(p => p.id === 8)?.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enlaces */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://msvadmin.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    🌐 Ver Proyecto en Vivo
                  </a>
                  <a
                    href="https://github.com/naobregon27/MSVFront"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
                  >
                    💻 Ver Código en GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Clínica Fisioterapia */}
      <AnimatePresence>
        {openModalId === 10 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setOpenModalId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Clínica Fisioterapia</h2>
                  <button
                    onClick={() => setOpenModalId(null)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/90 mt-2">Sistema Integral de Gestión para Clínicas de Fisioterapia</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Características Destacadas */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    ✨ Características Destacadas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-teal-500 text-lg">👥</span>
                        <div>
                          <p className="font-medium text-gray-800">Gestión Integral de Pacientes</p>
                          <p className="text-sm text-gray-600">Registro completo con historial médico y seguimiento de sesiones</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-500 text-lg">📅</span>
                        <div>
                          <p className="font-medium text-gray-800">Sistema de Sesiones</p>
                          <p className="text-sm text-gray-600">Planilla diaria interactiva con control de estados</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-500 text-lg">💰</span>
                        <div>
                          <p className="font-medium text-gray-800">Gestión Financiera</p>
                          <p className="text-sm text-gray-600">Múltiples métodos de pago y control de deudas</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-purple-500 text-lg">📊</span>
                        <div>
                          <p className="font-medium text-gray-800">Dashboard Interactivo</p>
                          <p className="text-sm text-gray-600">Métricas en tiempo real y estadísticas visuales</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-orange-500 text-lg">🔐</span>
                        <div>
                          <p className="font-medium text-gray-800">Autenticación Robusta</p>
                          <p className="text-sm text-gray-600">JWT con refresh tokens y verificación de email</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-indigo-500 text-lg">👨‍💼</span>
                        <div>
                          <p className="font-medium text-gray-800">Panel de Administración</p>
                          <p className="text-sm text-gray-600">Sistema de roles y auditoría completa</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 text-lg">📄</span>
                        <div>
                          <p className="font-medium text-gray-800">Exportación y Reportes</p>
                          <p className="text-sm text-gray-600">Exportación a Excel e impresión profesional</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-cyan-500 text-lg">🏥</span>
                        <div>
                          <p className="font-medium text-gray-800">Especialización en Fisioterapia</p>
                          <p className="text-sm text-gray-600">Diseñado específicamente para el sector salud</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Módulos Principales */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    🎯 Módulos Principales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span className="text-gray-700">Gestión de pacientes con historial completo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">Planilla diaria de sesiones interactiva</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Control financiero y pagos pendientes</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">Dashboard con métricas en tiempo real</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">Sistema de roles y permisos</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700">Reportes y exportación a Excel</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tecnologías */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">🛠️ Tecnologías Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects.find(p => p.id === 10)?.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 text-gray-700 rounded-full text-sm font-medium border border-teal-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enlaces */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://fisioterapiamiguel.netlify.app/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
                  >
                    🌐 Ver Proyecto en Vivo
                  </a>
                  <a
                    href="https://github.com/naobregon27?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
                  >
                    💻 Ver Código en GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal GameXperience */}
      <AnimatePresence>
        {openModalId === 11 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setOpenModalId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">GameXperience</h2>
                  <button
                    onClick={() => setOpenModalId(null)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/90 mt-2">Plataforma Social Completa para la Comunidad Gamer</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Características Destacadas */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    ✨ Características Destacadas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-purple-500 text-lg">👥</span>
                        <div>
                          <p className="font-medium text-gray-800">Comunidades Estilo Discord</p>
                          <p className="text-sm text-gray-600">Creación de comunidades públicas y privadas con roles</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-pink-500 text-lg">💬</span>
                        <div>
                          <p className="font-medium text-gray-800">Chat en Tiempo Real</p>
                          <p className="text-sm text-gray-600">Comunicación instantánea con Socket.IO</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-500 text-lg">🎮</span>
                        <div>
                          <p className="font-medium text-gray-800">Eventos y Torneos</p>
                          <p className="text-sm text-gray-600">Sistema completo de gestión de eventos gaming</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-500 text-lg">💳</span>
                        <div>
                          <p className="font-medium text-gray-800">Billetera Virtual</p>
                          <p className="text-sm text-gray-600">Integración con Mercado Pago para transacciones</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-orange-500 text-lg">🤝</span>
                        <div>
                          <p className="font-medium text-gray-800">Sistema de Amistades</p>
                          <p className="text-sm text-gray-600">Conecta con otros jugadores y forma tu red</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-cyan-500 text-lg">📱</span>
                        <div>
                          <p className="font-medium text-gray-800">Chat Directo</p>
                          <p className="text-sm text-gray-600">Conversaciones privadas entre usuarios</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 text-lg">🔔</span>
                        <div>
                          <p className="font-medium text-gray-800">Notificaciones en Tiempo Real</p>
                          <p className="text-sm text-gray-600">Sistema completo de alertas y notificaciones</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-indigo-500 text-lg">🎨</span>
                        <div>
                          <p className="font-medium text-gray-800">Diseño Moderno</p>
                          <p className="text-sm text-gray-600">Glassmorphism, temas dark/light y animaciones fluidas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funcionalidades Principales */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    🎯 Funcionalidades Principales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">Comunidades con chat dedicado por comunidad</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-gray-700">Sistema de eventos con inscripciones y premios</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">Billetera virtual con depósitos y retiros</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Sistema de likes, comentarios y reposts</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">Chat directo con ventanas minimizables</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span className="text-gray-700">Dashboard completo tipo Discord</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tecnologías */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">🛠️ Tecnologías Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects.find(p => p.id === 11)?.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700 rounded-full text-sm font-medium border border-purple-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enlaces */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://gamexperience.games/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                  >
                    🌐 Ver Proyecto en Vivo
                  </a>
                  <a
                    href="https://github.com/naobregon27?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
                  >
                    💻 Ver Código en GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects; 