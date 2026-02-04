import { motion } from 'framer-motion';
import { useState } from 'react';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Juan Lamberti",
      role: "Director de Tecnología",
      company: "Sistemas Administrativos SA",
      image: "https://ui-avatars.com/api/?name=Juan+Lamberti&background=22c55e&color=fff&size=200",
      text: "Nahuel desarrolló un sistema completo que mejoró nuestra eficiencia operativa en un 40%. Su profesionalismo, conocimiento técnico y capacidad para entender las necesidades del negocio son excepcionales. Altamente recomendado.",
      rating: 5,
      project: "Sistema de Laboratorio",
      date: "2023",
      metrics: "Redujo tiempos de procesamiento en 60%"
    },
    {
      id: 2,
      name: "María González",
      role: "CEO",
      company: "MSV Seguridad e Higiene",
      image: "https://ui-avatars.com/api/?name=Maria+Gonzalez&background=0ea5e9&color=fff&size=200",
      text: "La plataforma que desarrolló Nahuel transformó completamente nuestra forma de trabajar. El sistema de gestión es intuitivo, robusto y ha permitido que coordinemos servicios con una eficiencia que nunca habíamos logrado. Un profesional de primer nivel.",
      rating: 5,
      project: "MSV Admin Platform",
      date: "2024",
      metrics: "500+ servicios coordinados mensualmente"
    },
    {
      id: 3,
      name: "Carlos Méndez",
      role: "Director Comercial",
      company: "Chile Compra",
      image: "https://ui-avatars.com/api/?name=Carlos+Mendez&background=8b5cf6&color=fff&size=200",
      text: "Trabajar con Nahuel fue una experiencia extraordinaria. No solo cumplió con todos los requerimientos técnicos, sino que aportó ideas innovadoras que mejoraron significativamente nuestro e-commerce. Los resultados hablan por sí solos.",
      rating: 5,
      project: "E-commerce Platform",
      date: "2023-2024",
      metrics: "35% incremento en conversión de ventas"
    },
    {
      id: 4,
      name: "Dr. Miguel Fernández",
      role: "Director Médico",
      company: "Clínica de Fisioterapia",
      image: "https://ui-avatars.com/api/?name=Miguel+Fernandez&background=f59e0b&color=fff&size=200",
      text: "El sistema que desarrolló Nahuel revolucionó nuestra clínica. Ahora podemos gestionar 400+ pacientes de manera eficiente, el dashboard nos da métricas en tiempo real y hemos reducido el trabajo administrativo en un 80%. Inversión que valió cada peso.",
      rating: 5,
      project: "Sistema de Gestión Clínica",
      date: "2024",
      metrics: "2,500+ sesiones gestionadas"
    },
    {
      id: 5,
      name: "Ana Rodríguez",
      role: "Gerente de Marketing",
      company: "Bet30 Casino",
      image: "https://ui-avatars.com/api/?name=Ana+Rodriguez&background=ec4899&color=fff&size=200",
      text: "Nahuel no solo es un excelente desarrollador, también entiende de negocio y marketing. Implementó sistemas de analytics y automatización que nos permitieron escalar nuestras operaciones de manera impresionante. Un talento único.",
      rating: 5,
      project: "Casino Virtual Platform",
      date: "2025",
      metrics: "50,000+ transacciones procesadas"
    },
    {
      id: 6,
      name: "Roberto Silva",
      role: "Product Owner",
      company: "GameXperience",
      image: "https://ui-avatars.com/api/?name=Roberto+Silva&background=14b8a6&color=fff&size=200",
      text: "La red social gamer que construyó Nahuel superó todas nuestras expectativas. Socket.IO para chat en tiempo real, sistema de comunidades, eventos, pagos... Todo funciona perfectamente. 3,000+ usuarios activos en pocos meses.",
      rating: 5,
      project: "GameXperience Platform",
      date: "2024-2025",
      metrics: "100+ comunidades creadas"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            Lo que dicen mis clientes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Testimonios reales de clientes satisfechos que confiaron en mi trabajo
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-10"></div>
              
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Image */}
                  <motion.div
                    key={activeTestimonial}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    key={`content-${activeTestimonial}`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 text-center md:text-left"
                  >
                    {/* Stars */}
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="mb-6">
                      <svg className="w-10 h-10 text-green-500 opacity-50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                        "{testimonials[activeTestimonial].text}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {testimonials[activeTestimonial].name}
                      </h3>
                      <p className="text-primary font-semibold">
                        {testimonials[activeTestimonial].role}
                      </p>
                      <p className="text-gray-600">
                        {testimonials[activeTestimonial].company}
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          📊 {testimonials[activeTestimonial].metrics}
                        </span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          🎯 {testimonials[activeTestimonial].project}
                        </span>
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          📅 {testimonials[activeTestimonial].date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTestimonial}
                    className="w-12 h-12 bg-white border-2 border-green-500 text-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextTestimonial}
                    className="w-12 h-12 bg-white border-2 border-green-500 text-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeTestimonial
                          ? 'bg-green-500 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Todos los testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setActiveTestimonial(index)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-green-500"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                  "{testimonial.text}"
                </p>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {testimonial.project}
                  </span>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-12 shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para ser mi próximo cliente satisfecho?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Únete a la lista de empresas que han transformado sus operaciones con soluciones tecnológicas de calidad
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Comenzar mi proyecto
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
