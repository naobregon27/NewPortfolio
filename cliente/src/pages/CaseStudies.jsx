import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const caseStudies = [
    {
      id: 1,
      title: "GameXperience: Red Social para Gamers",
      subtitle: "Plataforma social completa con chat en tiempo real y sistema de comunidades",
      client: "GameXperience Inc.",
      duration: "6 meses",
      year: "2024-2025",
      category: "Social Network",
      headerImage: "/WhatsApp Image 2025-12-05 at 18.24.07.jpeg",
      challenge: {
        title: "El Desafío",
        description: "El cliente necesitaba una plataforma social específica para gamers que combinara características de Discord, Twitter y Twitch. Debía soportar comunicación en tiempo real, gestión de comunidades, eventos/torneos, y un sistema de billetera virtual integrado con Mercado Pago.",
        problems: [
          "Escalabilidad para 3,000+ usuarios simultáneos",
          "Chat en tiempo real con latencia mínima",
          "Sistema de notificaciones eficiente",
          "Integración compleja de pagos",
          "UI/UX competitiva con plataformas establecidas"
        ]
      },
      solution: {
        title: "La Solución",
        description: "Desarrollé una arquitectura escalable utilizando Socket.IO para comunicación en tiempo real, Redux Toolkit con Redux Persist para gestión de estado offline-first, y una integración robusta con Mercado Pago para transacciones.",
        keyFeatures: [
          "Sistema de comunidades con roles y permisos granulares",
          "Chat en tiempo real con soporte para emojis, GIFs y archivos",
          "Dashboard tipo Discord con navegación intuitiva",
          "Sistema de eventos y torneos con inscripciones automatizadas",
          "Billetera virtual con historial de transacciones",
          "Notificaciones push en tiempo real",
          "Sistema de amistades y chat directo",
          "Feed social con likes, comentarios y reposts"
        ],
        techStack: [
          { name: "React + Vite", icon: "⚛️" },
          { name: "Socket.IO", icon: "🔌" },
          { name: "Redux Toolkit", icon: "🔄" },
          { name: "Tailwind CSS", icon: "🎨" },
          { name: "Three.js", icon: "🎮" },
          { name: "Framer Motion", icon: "✨" },
          { name: "Node.js + Express", icon: "🟢" },
          { name: "MongoDB", icon: "🍃" },
          { name: "Mercado Pago API", icon: "💳" }
        ]
      },
      challenges: {
        title: "Desafíos Técnicos Superados",
        items: [
          {
            challenge: "Escalabilidad del chat en tiempo real",
            solution: "Implementé rooms de Socket.IO con namespaces por comunidad, reduciendo la carga del servidor en un 60%. Agregué throttling y debouncing para eventos de escritura."
          },
          {
            challenge: "Performance con 100+ comunidades",
            solution: "Virtualización de listas con react-window, lazy loading de componentes, y code splitting por rutas. Reduje el tiempo de carga inicial de 8s a 2s."
          },
          {
            challenge: "Sincronización de estado entre múltiples pestañas",
            solution: "Redux Persist con broadcast channels para sincronizar estado en tiempo real entre pestañas del navegador."
          },
          {
            challenge: "Seguridad en transacciones",
            solution: "Implementé JWT con refresh tokens, encriptación de datos sensibles, y validación server-side de todas las transacciones."
          }
        ]
      },
      results: {
        title: "Resultados e Impacto",
        metrics: [
          { label: "Usuarios Activos", value: "3,000+", change: "+250%", trend: "up" },
          { label: "Comunidades Creadas", value: "100+", change: "+180%", trend: "up" },
          { label: "Eventos Organizados", value: "200+", change: "N/A", trend: "neutral" },
          { label: "Mensajes Diarios", value: "50,000+", change: "+300%", trend: "up" },
          { label: "Tiempo de Carga", value: "2.1s", change: "-75%", trend: "up" },
          { label: "Retención (30 días)", value: "78%", change: "+45%", trend: "up" }
        ],
        testimonial: {
          text: "Nahuel no solo construyó una plataforma técnicamente sólida, sino que entendió perfectamente la cultura gamer y creó una experiencia que nuestros usuarios aman. El sistema de chat y comunidades funciona de manera impecable incluso con miles de usuarios simultáneos.",
          author: "Roberto Silva",
          role: "Product Owner, GameXperience"
        }
      },
      learnings: {
        title: "Aprendizajes Clave",
        points: [
          "La optimización temprana de WebSockets es crucial para aplicaciones en tiempo real",
          "Redux Persist puede causar problemas de performance si no se configura correctamente",
          "La virtualización de listas es esencial para UX fluida con grandes datasets",
          "Los usuarios valoran más la estabilidad que las features fancy",
          "La documentación clara reduce drásticamente los tickets de soporte"
        ]
      },
      links: {
        live: "https://gamexperience.games/",
        github: "https://github.com/naobregon27?tab=repositories"
      }
    },
    {
      id: 2,
      title: "Clínica Fisioterapia: Sistema de Gestión Médica",
      subtitle: "Digitalización completa de una clínica con 400+ pacientes",
      client: "Clínica de Fisioterapia Dr. Fernández",
      duration: "4 meses",
      year: "2024",
      category: "Healthcare",
      headerImage: "/WhatsApp Image 2025-12-05 at 10.53.06.jpeg",
      challenge: {
        title: "El Desafío",
        description: "Una clínica de fisioterapia operaba completamente con papel y Excel. Necesitaban un sistema integral que digitalizara toda su operación: gestión de pacientes, sesiones, pagos, inventario y reportes administrativos.",
        problems: [
          "Pérdida de tiempo en tareas administrativas (4+ horas diarias)",
          "Errores frecuentes en registros manuales",
          "Dificultad para hacer seguimiento de tratamientos",
          "Sin métricas ni reportes de negocio",
          "Imposibilidad de escalar sin contratar más personal administrativo"
        ]
      },
      solution: {
        title: "La Solución",
        description: "Diseñé y desarrollé un sistema completo de gestión clínica con dashboard interactivo, gestión de pacientes con historial médico, planilla diaria de sesiones, control financiero automatizado y sistema de reportes con exportación a Excel.",
        keyFeatures: [
          "Gestión completa de pacientes con historial médico",
          "Planilla diaria interactiva con cambios de estado en tiempo real",
          "Sistema de pagos con múltiples métodos",
          "Dashboard con métricas en tiempo real (KPIs)",
          "Control de deudas y pagos pendientes",
          "Exportación de reportes a Excel",
          "Sistema de roles (Admin, Doctor, Recepcionista)",
          "Autenticación segura con JWT y refresh tokens"
        ],
        techStack: [
          { name: "React + Vite", icon: "⚛️" },
          { name: "Redux Toolkit", icon: "🔄" },
          { name: "Material-UI", icon: "🎨" },
          { name: "Tailwind CSS", icon: "💨" },
          { name: "Framer Motion", icon: "✨" },
          { name: "React Hook Form", icon: "📝" },
          { name: "Yup", icon: "✅" },
          { name: "Axios", icon: "🌐" },
          { name: "XLSX", icon: "📊" },
          { name: "Recharts", icon: "📈" },
          { name: "Node.js + Express", icon: "🟢" },
          { name: "MongoDB", icon: "🍃" }
        ]
      },
      challenges: {
        title: "Desafíos Técnicos Superados",
        items: [
          {
            challenge: "Migración de datos históricos",
            solution: "Desarrollé scripts de migración para importar 5 años de datos desde Excel. Implementé validación exhaustiva y backup automático en cada paso."
          },
          {
            challenge: "Usabilidad para personal no técnico",
            solution: "Diseñé un sistema de onboarding interactivo con tooltips y tutorial paso a paso. Realicé 3 iteraciones basadas en feedback real del personal."
          },
          {
            challenge: "Performance con 2,500+ sesiones",
            solution: "Implementé paginación server-side, indexación de MongoDB optimizada, y caching en memoria para consultas frecuentes."
          },
          {
            challenge: "Generación de reportes complejos",
            solution: "Utilicé workers para procesar reportes en background, evitando bloquear la UI. Los reportes grandes se generan en <5 segundos."
          }
        ]
      },
      results: {
        title: "Resultados e Impacto",
        metrics: [
          { label: "Pacientes Gestionados", value: "400+", change: "N/A", trend: "neutral" },
          { label: "Sesiones Registradas", value: "2,500+", change: "N/A", trend: "neutral" },
          { label: "Tiempo Administrativo", value: "-80%", change: "-80%", trend: "up" },
          { label: "Errores de Registro", value: "-95%", change: "-95%", trend: "up" },
          { label: "ROI (6 meses)", value: "340%", change: "+340%", trend: "up" },
          { label: "Satisfacción Personal", value: "98%", change: "+65%", trend: "up" }
        ],
        testimonial: {
          text: "Este sistema cambió completamente nuestra clínica. Lo que antes tomaba 4 horas ahora toma 30 minutos. Tenemos visibilidad completa de nuestras operaciones y podemos tomar decisiones basadas en datos. La inversión se pagó sola en 6 meses.",
          author: "Dr. Miguel Fernández",
          role: "Director Médico"
        }
      },
      learnings: {
        title: "Aprendizajes Clave",
        points: [
          "El onboarding y la capacitación son tan importantes como el código",
          "Las interfaces simples y limpias reducen dramáticamente la resistencia al cambio",
          "Los reportes automáticos generan más valor que features complejas",
          "La migración de datos debe ser incremental y reversible",
          "El feedback temprano y frecuente del usuario final es invaluable"
        ]
      },
      links: {
        live: "https://fisioterapiamiguel.netlify.app/dashboard",
        github: "https://github.com/naobregon27?tab=repositories"
      }
    },
    {
      id: 3,
      title: "MSV Admin: Plataforma de Gestión de Servicios Técnicos",
      subtitle: "Sistema completo para coordinar técnicos, servicios y clientes",
      client: "MSV Seguridad e Higiene Laboral",
      duration: "5 meses",
      year: "2024",
      category: "SaaS",
      headerImage: "/MSVadmin.jpeg",
      challenge: {
        title: "El Desafío",
        description: "Una empresa de servicios técnicos gestionaba todo manualmente: asignación de técnicos, seguimiento de visitas, inventario de EPP, cursos de capacitación. Necesitaban una plataforma que automatizara y centralizara todas estas operaciones.",
        problems: [
          "Coordinación caótica de 30+ técnicos",
          "Falta de visibilidad en el estado de servicios",
          "Inventario desorganizado con pérdidas frecuentes",
          "Clientes sin información de estado de servicios",
          "Imposibilidad de escalar operaciones"
        ]
      },
      solution: {
        title: "La Solución",
        description: "Desarrollé un ecosistema completo con panel administrativo, plataforma de clientes, y sistema de gestión de inventario. Incluye dashboards con métricas en tiempo real, sistema de notificaciones, y visualizaciones 3D interactivas.",
        keyFeatures: [
          "Dashboard administrativo con métricas en tiempo real",
          "Sistema de gestión de técnicos con disponibilidad",
          "Coordinación automática de visitas técnicas",
          "Gestión de inventario con alertas de stock",
          "Portal de clientes para seguimiento de servicios",
          "Sistema de cursos y capacitaciones",
          "Notificaciones automatizadas por email y SMS",
          "Visualizaciones 3D con Three.js"
        ],
        techStack: [
          { name: "React + Vite", icon: "⚛️" },
          { name: "Redux Toolkit", icon: "🔄" },
          { name: "Redux Persist", icon: "💾" },
          { name: "Tailwind CSS", icon: "🎨" },
          { name: "Framer Motion", icon: "✨" },
          { name: "Three.js", icon: "🎮" },
          { name: "React Three Fiber", icon: "🎯" },
          { name: "Axios", icon: "🌐" },
          { name: "Node.js + Express", icon: "🟢" },
          { name: "MongoDB", icon: "🍃" },
          { name: "JWT", icon: "🔐" }
        ]
      },
      challenges: {
        title: "Desafíos Técnicos Superados",
        items: [
          {
            challenge: "Coordinación en tiempo real de técnicos",
            solution: "Implementé un sistema de estado distribuido con WebSockets y sincronización optimista. Los técnicos ven actualizaciones instantáneas de nuevas asignaciones."
          },
          {
            challenge: "Manejo de conflictos de horarios",
            solution: "Algoritmo de scheduling inteligente que detecta conflictos y sugiere alternativas automáticamente. Reduce conflictos en un 90%."
          },
          {
            challenge: "Performance de visualizaciones 3D",
            solution: "Optimicé shaders y geometrías, implementé LOD (Level of Detail) dinámico, y lazy loading de modelos 3D. Mantiene 60 FPS constantes."
          },
          {
            challenge: "Sistema de notificaciones escalable",
            solution: "Queue system con Bull para procesar notificaciones en background. Soporta 10,000+ notificaciones/día sin degradación."
          }
        ]
      },
      results: {
        title: "Resultados e Impacto",
        metrics: [
          { label: "Técnicos Gestionados", value: "30+", change: "N/A", trend: "neutral" },
          { label: "Visitas Coordinadas", value: "500+", change: "+200%", trend: "up" },
          { label: "Tiempo de Coordinación", value: "-65%", change: "-65%", trend: "up" },
          { label: "Satisfacción Cliente", value: "95%", change: "+40%", trend: "up" },
          { label: "Conflictos de Agenda", value: "-90%", change: "-90%", trend: "up" },
          { label: "Pérdida de Inventario", value: "-75%", change: "-75%", trend: "up" }
        ],
        testimonial: {
          text: "La plataforma transformó completamente nuestra operación. Antes era caos coordinar 30 técnicos; ahora todo está centralizado y automatizado. Las visualizaciones 3D impresionan a nuestros clientes y el sistema de alertas nos ha ahorrado miles de dólares en inventario.",
          author: "María González",
          role: "CEO, MSV Seguridad e Higiene"
        }
      },
      learnings: {
        title: "Aprendizajes Clave",
        points: [
          "Los algoritmos de scheduling deben ser flexibles y permitir overrides manuales",
          "Las visualizaciones 3D pueden ser un diferenciador clave si están bien implementadas",
          "Un buen sistema de notificaciones reduce drásticamente la carga del soporte",
          "La sincronización de estado en aplicaciones complejas requiere arquitectura cuidadosa",
          "Las métricas visuales en tiempo real generan confianza en el cliente"
        ]
      },
      links: {
        live: "https://msvadmin.netlify.app/",
        github: "https://github.com/naobregon27/MSVFront"
      }
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
            Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Análisis profundos de proyectos reales: desafíos, soluciones técnicas, y resultados medibles
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header Image */}
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={study.headerImage}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span className="inline-block px-3 py-1 bg-green-500 rounded-full text-sm font-medium mb-4">
                    {study.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{study.title}</h2>
                  <p className="text-lg text-gray-200">{study.subtitle}</p>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <span>👤 {study.client}</span>
                    <span>⏱️ {study.duration}</span>
                    <span>📅 {study.year}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 space-y-12">
                {/* Challenge */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-3xl mr-3">🎯</span>
                    {study.challenge.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {study.challenge.description}
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">Problemas principales:</h4>
                    <ul className="space-y-2">
                      {study.challenge.problems.map((problem, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <span className="text-red-500 mr-2">❌</span>
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-3xl mr-3">💡</span>
                    {study.solution.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {study.solution.description}
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Features clave implementadas:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {study.solution.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-gray-700">
                          <span className="text-green-500 mr-2">✅</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Stack Tecnológico:</h4>
                    <div className="flex flex-wrap gap-3">
                      {study.solution.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg"
                        >
                          <span className="text-2xl">{tech.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Challenges */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-3xl mr-3">🔧</span>
                    {study.challenges.title}
                  </h3>
                  <div className="space-y-6">
                    {study.challenges.items.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start mb-3">
                          <span className="text-2xl mr-3">⚠️</span>
                          <div>
                            <h5 className="font-bold text-gray-800 mb-2">{item.challenge}</h5>
                            <div className="flex items-start">
                              <span className="text-2xl mr-3">🚀</span>
                              <p className="text-gray-700">{item.solution}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="text-3xl mr-3">📊</span>
                    {study.results.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {study.results.metrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 text-center border border-green-200"
                      >
                        <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                        {metric.change !== "N/A" && (
                          <div className={`text-xs font-medium ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {metric.trend === 'up' && '↑ '}
                            {metric.change}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-8 text-white">
                    <div className="flex items-start">
                      <svg className="w-12 h-12 mr-4 flex-shrink-0 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <div>
                        <p className="text-lg leading-relaxed mb-4">
                          {study.results.testimonial.text}
                        </p>
                        <div>
                          <p className="font-bold">{study.results.testimonial.author}</p>
                          <p className="text-sm text-white/80">{study.results.testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learnings */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-3xl mr-3">💎</span>
                    {study.learnings.title}
                  </h3>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <ul className="space-y-3">
                      {study.learnings.points.map((point, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <span className="text-blue-500 mr-2 font-bold">{idx + 1}.</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <a
                    href={study.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🌐 Ver Proyecto en Vivo
                  </a>
                  <a
                    href={study.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    💻 Ver en GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-12 shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Tu proyecto será el próximo Case Study?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Transformemos tu desafío técnico en una historia de éxito medible
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Comenzar mi proyecto
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudies;
