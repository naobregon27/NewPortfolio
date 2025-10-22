/**
 * Middleware para manejo de errores
 */

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  console.error('Error:', err);

  // Error de validación de Joi
  if (err.isJoi) {
    const message = err.details.map(detail => detail.message).join(', ');
    error.message = `Error de validación: ${message}`;
    error.statusCode = 400;
  }

  // Error de SendGrid
  if (err.code && err.code === 'ENOTFOUND') {
    error.message = 'Error de conexión con el servicio de email';
    error.statusCode = 503;
  }

  // Error de CORS
  if (err.message === 'No permitido por CORS') {
    error.message = 'Origen no permitido';
    error.statusCode = 403;
  }

  // Error de rate limiting
  if (err.status === 429) {
    error.message = 'Demasiadas solicitudes, intenta más tarde';
    error.statusCode = 429;
  }

  // Error de parsing JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error.message = 'JSON inválido en el cuerpo de la petición';
    error.statusCode = 400;
  }

  // Error de tamaño de payload
  if (err.code === 'LIMIT_FILE_SIZE') {
    error.message = 'Archivo demasiado grande';
    error.statusCode = 413;
  }

  // Error de SendGrid específico
  if (err.response && err.response.body && err.response.body.errors) {
    const sendgridError = err.response.body.errors[0];
    error.message = `Error de SendGrid: ${sendgridError.message}`;
    error.statusCode = 400;
  }

  // Error por defecto
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      status: statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
