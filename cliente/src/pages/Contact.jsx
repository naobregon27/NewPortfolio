import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { contactService } from '../services/contactService';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [countdown, setCountdown] = useState(3);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Datos del formulario:', formData);
      const result = await contactService.sendMessage(formData);
      console.log('Resultado del servicio:', result);
      
      if (result.success) {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
        
        // Iniciar countdown y redirección
        let timeLeft = 3;
        setCountdown(timeLeft);
        
        const countdownInterval = setInterval(() => {
          timeLeft--;
          setCountdown(timeLeft);
          
          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            navigate('/');
          }
        }, 1000);
      } else {
        setSubmitStatus('error');
        console.error('Error al enviar mensaje:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error inesperado:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Email',
      content: 'tu@email.com',
      link: 'mailto:tu@email.com',
    },
    {
      icon: (
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: 'Ubicación',
      content: 'Ciudad, País',
      link: 'https://maps.google.com',
    },
    {
      icon: (
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: 'Teléfono',
      content: '+123 456 7890',
      link: 'tel:+1234567890',
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
            Contacto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white placeholder-gray-500"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Enviar Mensaje'
                  )}
                </motion.button>
                {/* Mensaje de éxito */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-green-800 mb-1">
                    ¡Mensaje enviado con éxito!
                        </h3>
                        <p className="text-green-600 text-sm">
                          Te responderé lo antes posible. ¡Gracias por contactarme!
                        </p>
                        <motion.p 
                          key={countdown}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-green-500 text-xs mt-2 font-medium"
                        >
                          Serás redirigido al inicio en {countdown} segundos...
                  </motion.p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="mt-4 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                    />
                  </motion.div>
                )}

                {/* Mensaje de error */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                    className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                        className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-red-800 mb-1">
                          Error al enviar el mensaje
                        </h3>
                        <p className="text-red-600 text-sm">
                          Por favor, verifica tu conexión e intenta de nuevo.
                        </p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="mt-4 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"
                    />
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Información de Contacto
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="text-primary">{info.icon}</div>
                      <div>
                        <h3 className="font-medium">{info.title}</h3>
                        <p className="text-gray-600">{info.content}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Redes Sociales
                </h2>
                <div className="flex space-x-4">
                  {/* Agrega tus enlaces a redes sociales aquí */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 