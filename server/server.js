// Configurar variables de entorno PRIMERO
import './config/env.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Importar rutas
import contactRoutes from './routes/contact.js';

// Importar middleware personalizado
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { validateContact } from './middleware/validation.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Configurar trust proxy para que funcione correctamente detrás de proxies (Render, etc.)
// Esto es necesario para que express-rate-limit identifique correctamente las IPs
app.set('trust proxy', true);

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173'
    ];
    
    // Permitir requests sin origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Middleware de compresión
app.use(compression());

// Middleware de logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // máximo 5 requests por ventana
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Deshabilitar validación de X-Forwarded-For ya que trust proxy está configurado
  validate: {
    xForwardedForHeader: false
  },
  // Configurar keyGenerator para usar la IP correcta cuando está detrás de un proxy
  keyGenerator: (req) => {
    // Usar X-Forwarded-For si está disponible (cuando trust proxy está activado)
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
  skip: (req) => {
    // Saltar rate limiting en desarrollo local para testing
    return process.env.NODE_ENV === 'development' && 
           (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1');
  }
});

app.use('/api/contact', limiter);

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas de salud del servidor
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    services: {
      sendgrid: process.env.SENDGRID_API_KEY ? 'configured' : 'not_configured'
    }
  });
});

// Rutas principales
app.use('/api/contact', contactRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Contact API',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/health',
    contact: '/api/contact'
  });
});

// Middleware de manejo de errores
app.use(notFound);
app.use(errorHandler);

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 SendGrid: ${process.env.SENDGRID_API_KEY ? 'Configurado' : 'No configurado'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 API: http://localhost:${PORT}/api/health`);
});

export default app;
