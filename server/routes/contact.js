import express from 'express';
import { validateContact, validateSpam } from '../middleware/validation.js';
import emailService from '../utils/emailService.js';

const router = express.Router();

/**
 * POST /api/contact
 * Enviar mensaje de contacto
 */
router.post('/', validateContact, validateSpam, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Verificar si el servicio de email está configurado
    if (!emailService.isConfigured()) {
      console.warn('⚠️  Servicio de email no configurado');
      return res.status(503).json({
        success: false,
        error: {
          message: 'Servicio de email no disponible temporalmente',
          status: 503
        }
      });
    }

    // Preparar datos del contacto
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };

    console.log(`📧 Nuevo mensaje de contacto de: ${name} (${email})`);

    // Enviar emails en paralelo
    const [adminResult, userResult] = await Promise.allSettled([
      emailService.sendAdminNotification(contactData),
      emailService.sendUserConfirmation(contactData)
    ]);

    // Verificar resultados
    const adminSuccess = adminResult.status === 'fulfilled';
    const userSuccess = userResult.status === 'fulfilled';

    if (!adminSuccess && !userSuccess) {
      throw new Error('Error enviando ambos emails');
    }

    // Log de resultados
    if (adminSuccess) {
      console.log('✅ Email al administrador enviado');
    } else {
      console.error('❌ Error enviando email al administrador:', adminResult.reason);
    }

    if (userSuccess) {
      console.log('✅ Email de confirmación enviado al usuario');
    } else {
      console.error('❌ Error enviando email de confirmación:', userResult.reason);
    }

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Mensaje enviado correctamente',
      data: {
        timestamp: contactData.timestamp,
        emailsSent: {
          admin: adminSuccess,
          user: userSuccess
        }
      }
    });

  } catch (error) {
    console.error('❌ Error en ruta de contacto:', error);
    
    // Error específico de SendGrid (401 Unauthorized)
    if (error.message && error.message.includes('SendGrid API Key inválida')) {
      return res.status(503).json({
        success: false,
        error: {
          message: 'Error de configuración del servicio de email. Por favor, contacta al administrador.',
          status: 503,
          details: 'La API key de SendGrid no está configurada correctamente'
        }
      });
    }
    
    // Error específico de SendGrid desde el response
    if (error.response && error.response.body && error.response.body.errors) {
      const sendgridError = error.response.body.errors[0];
      const statusCode = error.response.statusCode || 400;
      return res.status(statusCode).json({
        success: false,
        error: {
          message: `Error del servicio de email: ${sendgridError.message}`,
          status: statusCode,
          details: sendgridError
        }
      });
    }

    // Error genérico
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Error interno del servidor',
        status: 500
      }
    });
  }
});

/**
 * GET /api/contact/status
 * Verificar estado del servicio de contacto
 */
router.get('/status', (req, res) => {
  try {
    const serviceInfo = emailService.getServiceInfo();
    
    res.status(200).json({
      success: true,
      data: {
        service: 'Contact API',
        status: 'operational',
        emailService: serviceInfo,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Error verificando estado del servicio',
        status: 500
      }
    });
  }
});

/**
 * GET /api/contact/test
 * Endpoint de prueba (solo en desarrollo)
 */
router.get('/test', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Endpoint no disponible en producción',
        status: 404
      }
    });
  }

  res.status(200).json({
    success: true,
    message: 'Endpoint de prueba funcionando',
    data: {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      emailService: emailService.getServiceInfo()
    }
  });
});

/**
 * POST /api/contact/test-email
 * Enviar email de prueba (solo en desarrollo)
 */
router.post('/test-email', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Endpoint no disponible en producción',
        status: 404
      }
    });
  }

  try {
    const testData = {
      name: 'Usuario de Prueba',
      email: 'test@example.com',
      subject: 'Mensaje de Prueba',
      message: 'Este es un mensaje de prueba para verificar el funcionamiento del sistema de emails.'
    };

    const result = await emailService.sendAdminNotification(testData);
    
    res.status(200).json({
      success: true,
      message: 'Email de prueba enviado',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Error enviando email de prueba',
        details: error.message
      }
    });
  }
});

export default router;
