import apiRequest from './api.js';

// Servicio para manejar el envío de formularios de contacto
export const contactService = {
  // Enviar mensaje de contacto
  sendMessage: async (formData) => {
    const { name, email, subject, message } = formData;
    
    // Validar datos requeridos
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: 'Todos los campos son obligatorios'
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Por favor, ingresa un email válido'
      };
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    };

    console.log('Enviando payload:', payload);
    console.log('URL completa:', 'https://newportfolio-6x45.onrender.com/api/contact');

    // Verificar que todos los campos tengan contenido
    const hasEmptyFields = Object.values(payload).some(value => !value || value.trim() === '');
    if (hasEmptyFields) {
      console.error('Hay campos vacíos:', payload);
      return {
        success: false,
        error: 'Todos los campos son obligatorios'
      };
    }

    return await apiRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};

export default contactService;
