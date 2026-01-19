import sgMail from '@sendgrid/mail';

/**
 * Servicio de email usando SendGrid
 */
class EmailService {
  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY?.trim();
    this.fromEmail = process.env.FROM_EMAIL?.trim() || 'noreply@portfolio.com';
    this.fromName = process.env.FROM_NAME?.trim() || 'Portfolio Contact';
    this.adminEmail = process.env.ADMIN_EMAIL?.trim();
    this.replyToEmail = process.env.REPLY_TO_EMAIL?.trim() || this.fromEmail;

    if (!this.apiKey) {
      console.warn('⚠️  SENDGRID_API_KEY no configurada. Los emails no se enviarán.');
      return;
    }

    // Validar formato básico de la API key (debe empezar con SG.)
    if (!this.apiKey.startsWith('SG.')) {
      console.warn('⚠️  SENDGRID_API_KEY parece tener un formato inválido. Debe empezar con "SG."');
    }

    sgMail.setApiKey(this.apiKey);
    console.log('✅ SendGrid configurado correctamente');
    console.log(`📧 FROM_EMAIL: ${this.fromEmail}`);
    console.log(`📧 ADMIN_EMAIL: ${this.adminEmail || 'No configurado'}`);
  }

  /**
   * Enviar email de notificación al administrador
   */
  async sendAdminNotification(contactData) {
    if (!this.apiKey || !this.adminEmail) {
      throw new Error('SendGrid no configurado o email de administrador faltante');
    }

    const { name, email, subject, message } = contactData;
    const timestamp = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Mexico_City'
    });

    const msg = {
      to: this.adminEmail,
      from: {
        email: this.fromEmail,
        name: this.fromName
      },
      replyTo: email,
      subject: `📧 Nuevo mensaje de contacto: ${subject}`,
      html: this.generateAdminEmailHTML(name, email, subject, message, timestamp),
      text: this.generateAdminEmailText(name, email, subject, message, timestamp)
    };

    try {
      const response = await sgMail.send(msg);
      console.log('✅ Email de notificación enviado al administrador');
      return {
        success: true,
        messageId: response[0].headers['x-message-id'],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Error enviando email al administrador:', error);
      
      // Manejar errores específicos de SendGrid
      if (error.response) {
        const sendgridErrors = error.response.body?.errors || [];
        const errorMessages = sendgridErrors.map(e => e.message).join(', ');
        
        if (error.code === 401) {
          throw new Error(`SendGrid API Key inválida o no autorizada: ${errorMessages || 'Verifica tu SENDGRID_API_KEY en las variables de entorno'}`);
        }
        
        throw new Error(`Error de SendGrid: ${errorMessages || error.message}`);
      }
      
      throw new Error(`Error enviando email: ${error.message}`);
    }
  }

  /**
   * Enviar email de confirmación al usuario
   */
  async sendUserConfirmation(contactData) {
    if (!this.apiKey) {
      throw new Error('SendGrid no configurado');
    }

    const { name, email, subject } = contactData;
    const timestamp = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Mexico_City'
    });

    const msg = {
      to: email,
      from: {
        email: this.fromEmail,
        name: this.fromName
      },
      subject: `✅ Confirmación: ${subject}`,
      html: this.generateUserConfirmationHTML(name, subject, timestamp),
      text: this.generateUserConfirmationText(name, subject, timestamp)
    };

    try {
      const response = await sgMail.send(msg);
      console.log('✅ Email de confirmación enviado al usuario');
      return {
        success: true,
        messageId: response[0].headers['x-message-id'],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Error enviando email de confirmación:', error);
      
      // Manejar errores específicos de SendGrid
      if (error.response) {
        const sendgridErrors = error.response.body?.errors || [];
        const errorMessages = sendgridErrors.map(e => e.message).join(', ');
        
        if (error.code === 401) {
          throw new Error(`SendGrid API Key inválida o no autorizada: ${errorMessages || 'Verifica tu SENDGRID_API_KEY en las variables de entorno'}`);
        }
        
        throw new Error(`Error de SendGrid: ${errorMessages || error.message}`);
      }
      
      throw new Error(`Error enviando email de confirmación: ${error.message}`);
    }
  }

  /**
   * Generar HTML para email del administrador
   */
  generateAdminEmailHTML(name, email, subject, message, timestamp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo mensaje de contacto</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #6b7280; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #4f46e5; margin: 15px 0; }
          .footer { background: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nuevo mensaje de contacto</h1>
            <p>Recibido el ${timestamp}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nombre:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Asunto:</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Mensaje:</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de tu portfolio.</p>
            <p>Puedes responder directamente a este email para contactar al usuario.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generar texto plano para email del administrador
   */
  generateAdminEmailText(name, email, subject, message, timestamp) {
    return `
NUEVO MENSAJE DE CONTACTO
========================

Recibido el: ${timestamp}

Nombre: ${name}
Email: ${email}
Asunto: ${subject}

Mensaje:
${message}

---
Este mensaje fue enviado desde el formulario de contacto de tu portfolio.
Puedes responder directamente a este email para contactar al usuario.
    `;
  }

  /**
   * Generar HTML para email de confirmación al usuario
   */
  generateUserConfirmationHTML(name, subject, timestamp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de mensaje</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
          .footer { background: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Mensaje recibido</h1>
          </div>
          <div class="content">
            <div class="success-icon">📧</div>
            <h2>¡Hola ${name}!</h2>
            <p>Hemos recibido tu mensaje con el asunto: <strong>"${subject}"</strong></p>
            <p>Te responderemos lo antes posible, generalmente en un plazo de 24 horas.</p>
            <p>Gracias por contactarnos.</p>
            <p><strong>Fecha de envío:</strong> ${timestamp}</p>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático de confirmación.</p>
            <p>Por favor, no respondas a este email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generar texto plano para email de confirmación al usuario
   */
  generateUserConfirmationText(name, subject, timestamp) {
    return `
CONFIRMACIÓN DE MENSAJE
======================

¡Hola ${name}!

Hemos recibido tu mensaje con el asunto: "${subject}"

Te responderemos lo antes posible, generalmente en un plazo de 24 horas.

Gracias por contactarnos.

Fecha de envío: ${timestamp}

---
Este es un mensaje automático de confirmación.
Por favor, no respondas a este email.
    `;
  }

  /**
   * Verificar si el servicio está configurado
   */
  isConfigured() {
    return !!(this.apiKey && this.adminEmail);
  }

  /**
   * Obtener información del servicio
   */
  getServiceInfo() {
    return {
      configured: this.isConfigured(),
      fromEmail: this.fromEmail,
      fromName: this.fromName,
      adminEmail: this.adminEmail,
      replyToEmail: this.replyToEmail
    };
  }
}

export default new EmailService();
