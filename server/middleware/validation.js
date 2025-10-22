import Joi from 'joi';

/**
 * Esquemas de validación para el formulario de contacto
 */

// Esquema para validación de datos de contacto
export const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .required()
    .messages({
      'string.empty': 'El nombre es requerido',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 100 caracteres',
      'any.required': 'El nombre es requerido'
    }),
  
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'Debe ser un email válido',
      'string.max': 'El email no puede exceder 255 caracteres',
      'any.required': 'El email es requerido'
    }),
  
  subject: Joi.string()
    .min(5)
    .max(200)
    .trim()
    .required()
    .messages({
      'string.empty': 'El asunto es requerido',
      'string.min': 'El asunto debe tener al menos 5 caracteres',
      'string.max': 'El asunto no puede exceder 200 caracteres',
      'any.required': 'El asunto es requerido'
    }),
  
  message: Joi.string()
    .min(10)
    .max(2000)
    .trim()
    .required()
    .messages({
      'string.empty': 'El mensaje es requerido',
      'string.min': 'El mensaje debe tener al menos 10 caracteres',
      'string.max': 'El mensaje no puede exceder 2000 caracteres',
      'any.required': 'El mensaje es requerido'
    })
});

/**
 * Middleware de validación para el formulario de contacto
 */
export const validateContact = (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errorMessages = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      error: {
        message: 'Error de validación',
        details: errorMessages,
        status: 400
      }
    });
  }

  // Sanitizar datos adicionales
  req.body = {
    ...value,
    name: value.name.replace(/[<>]/g, ''), // Remover caracteres potencialmente peligrosos
    subject: value.subject.replace(/[<>]/g, ''),
    message: value.message.replace(/[<>]/g, '')
  };

  next();
};

/**
 * Validación adicional para prevenir spam
 */
export const validateSpam = (req, res, next) => {
  const { message, name, email } = req.body;
  
  // Detectar posibles patrones de spam
  const spamPatterns = [
    /\b(viagra|cialis|casino|poker|loan|credit|debt|free money|click here)\b/i,
    /(http|https|www\.)/i,
    /[A-Z]{5,}/,
    /!{3,}/,
    /\?{3,}/
  ];

  const suspiciousContent = message + ' ' + name + ' ' + email;
  
  for (const pattern of spamPatterns) {
    if (pattern.test(suspiciousContent)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Contenido sospechoso detectado',
          status: 400
        }
      });
    }
  }

  // Verificar longitud excesiva de palabras
  const words = message.split(' ');
  const longWords = words.filter(word => word.length > 50);
  
  if (longWords.length > 3) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Contenido sospechoso detectado',
        status: 400
      }
    });
  }

  next();
};
