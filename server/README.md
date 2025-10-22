# Portfolio Contact API

Backend robusto para el sistema de contacto del portfolio, construido con Node.js, Express y SendGrid.

## 🚀 Características

- ✅ **Validación completa** de datos con Joi
- ✅ **Envío de emails** con SendGrid
- ✅ **Rate limiting** para prevenir spam
- ✅ **CORS configurado** para React
- ✅ **Manejo de errores** robusto
- ✅ **Logs detallados** para debugging
- ✅ **Emails HTML** con templates profesionales
- ✅ **Confirmaciones automáticas** al usuario
- ✅ **Notificaciones al administrador**

## 📁 Estructura del Proyecto

```
server/
├── package.json              # Dependencias y scripts
├── server.js                 # Servidor principal
├── env.example              # Variables de entorno de ejemplo
├── .gitignore               # Archivos a ignorar
├── README.md                # Documentación
├── middleware/
│   ├── errorHandler.js      # Manejo de errores
│   └── validation.js        # Validación de datos
├── routes/
│   └── contact.js          # Rutas de contacto
└── utils/
    └── emailService.js     # Servicio de email con SendGrid
```

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
cd server
npm install
```

2. **Configurar variables de entorno:**
```bash
cp env.example .env
```

3. **Editar archivo .env:**
```env
# Configuración del Servidor
PORT=5000
NODE_ENV=development

# SendGrid Configuration
SENDGRID_API_KEY=tu_api_key_de_sendgrid
FROM_EMAIL=noreply@tudominio.com
FROM_NAME=Portfolio Contact

# Email Templates
ADMIN_EMAIL=admin@tudominio.com
REPLY_TO_EMAIL=contact@tudominio.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://tudominio.com
```

## 🔧 Configuración de SendGrid

1. **Crear cuenta en SendGrid:**
   - Ve a [sendgrid.com](https://sendgrid.com)
   - Crea una cuenta gratuita (100 emails/día)

2. **Obtener API Key:**
   - Ve a Settings > API Keys
   - Crea una nueva API Key con permisos de "Mail Send"
   - Copia la key y pégala en tu archivo .env

3. **Verificar dominio (opcional pero recomendado):**
   - Ve a Settings > Sender Authentication
   - Verifica tu dominio para mejor deliverability

## 🚀 Ejecución

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor se ejecutará en `http://localhost:5000`

## 📋 Endpoints de la API

### 1. **POST /api/contact**
Enviar mensaje de contacto.

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "subject": "Consulta sobre proyecto",
  "message": "Hola, me interesa trabajar contigo en un proyecto web."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "data": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "emailsSent": {
      "admin": true,
      "user": true
    }
  }
}
```

### 2. **GET /api/contact/status**
Verificar estado del servicio.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "service": "Contact API",
    "status": "operational",
    "emailService": {
      "configured": true,
      "fromEmail": "noreply@tudominio.com",
      "fromName": "Portfolio Contact",
      "adminEmail": "admin@tudominio.com"
    },
    "timestamp": "2024-01-15T10:30:00.000Z",
    "version": "1.0.0"
  }
}
```

### 3. **GET /health**
Health check del servidor.

**Response (200):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "version": "1.0.0"
  }
}
```

### 4. **GET /api/health**
Health check de la API.

**Response (200):**
```json
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "sendgrid": "configured"
  }
}
```

## 🧪 Testing con Postman

### Collection de Postman:

1. **POST Contact Message:**
   - URL: `http://localhost:5000/api/contact`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "subject": "Test Subject",
     "message": "This is a test message from Postman."
   }
   ```

2. **GET Service Status:**
   - URL: `http://localhost:5000/api/contact/status`
   - Method: GET

3. **GET Health Check:**
   - URL: `http://localhost:5000/health`
   - Method: GET

## 🔒 Seguridad

- **Rate Limiting:** 5 requests por 15 minutos por IP
- **Validación de datos:** Joi schema validation
- **Sanitización:** Remoción de caracteres peligrosos
- **CORS:** Configurado para dominios específicos
- **Helmet:** Headers de seguridad
- **Spam Detection:** Patrones básicos de spam

## 📧 Templates de Email

### Email al Administrador:
- HTML profesional con estilos
- Información completa del contacto
- Timestamp y metadata
- Botón de respuesta directa

### Email de Confirmación al Usuario:
- Diseño amigable y profesional
- Confirmación de recepción
- Tiempo estimado de respuesta
- Branding del portfolio

## 🚀 Deploy en Render

1. **Conectar repositorio** a Render
2. **Configurar variables de entorno** en Render dashboard
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Deploy automático** en cada push

## 📊 Monitoreo

- **Logs detallados** en consola
- **Health checks** para monitoreo
- **Error tracking** con stack traces
- **Email delivery** status tracking

## 🛠️ Troubleshooting

### Error: "SendGrid no configurado"
- Verificar que `SENDGRID_API_KEY` esté en el archivo .env
- Verificar que la API key sea válida

### Error: "No permitido por CORS"
- Agregar tu dominio a `ALLOWED_ORIGINS` en .env
- Verificar que el frontend esté en un dominio permitido

### Error: "Demasiadas solicitudes"
- El rate limiting está funcionando
- Esperar 15 minutos o cambiar la configuración

## 📝 Próximos Pasos

1. **Configurar SendGrid** con tu API key
2. **Probar endpoints** con Postman
3. **Integrar con React** (modificar Contact.jsx)
4. **Deploy en Render**
5. **Configurar dominio personalizado**

---

**¡Tu backend está listo para funcionar! 🎉**
