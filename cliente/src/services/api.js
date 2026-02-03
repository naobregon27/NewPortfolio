// Configuración base de la API
const API_BASE_URL = 'https://newportfolio-6x45.onrender.com';

// Configuración de headers por defecto
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Función para hacer peticiones HTTP
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Intentar obtener más detalles del error del servidor
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      let errorDetails = null;
      try {
        const errorData = await response.json();
        console.log('Error del servidor:', errorData);
        
        // Manejar diferentes formatos de error
        if (errorData.error) {
          if (typeof errorData.error === 'string') {
            errorMessage = errorData.error;
          } else if (errorData.error.message) {
            errorMessage = errorData.error.message;
            errorDetails = errorData.error.details;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        // Si hay detalles de validación, incluirlos
        if (errorDetails && Array.isArray(errorDetails)) {
          const detailsText = errorDetails.map(d => `${d.field}: ${d.message}`).join(', ');
          errorMessage = `${errorMessage}. ${detailsText}`;
        }
      } catch (parseError) {
        // Si no se puede parsear el error, usar el mensaje por defecto
        console.log('No se pudo parsear el error del servidor:', parseError);
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return { 
      success: false, 
      error: error.message || 'Error de conexión' 
    };
  }
};

export default apiRequest;
