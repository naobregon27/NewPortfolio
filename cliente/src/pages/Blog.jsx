import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "Optimización de API Node.js: De 5s a 500ms",
      subtitle: "Cómo reduje el tiempo de respuesta de una API en un 90%",
      author: "Nahuel Obregón",
      date: "15 Enero 2025",
      readTime: "8 min",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      tags: ["Node.js", "Performance", "MongoDB", "Optimization"],
      excerpt: "Estrategias prácticas de optimización que implementé en producción para manejar 10,000+ requests/min con Node.js y MongoDB.",
      content: {
        intro: "En un proyecto reciente, me enfrenté a un desafío común pero crítico: una API que respondía en 5 segundos promedio. Los usuarios abandonaban, el negocio sufría. Aquí te comparto las técnicas exactas que usé para reducir ese tiempo a 500ms.",
        sections: [
          {
            title: "1. Identificación del Cuello de Botella",
            content: "Lo primero es medir. No optimices a ciegas. Implementé New Relic APM y descubrí que el 80% del tiempo se iba en queries a MongoDB sin índices.",
            code: {
              language: "javascript",
              snippet: `// Antes: 5 segundos ❌
const users = await User.find({ 
  email: req.query.email 
}); // Sin índice

// Después: 50ms ✅
// 1. Agregué índice en MongoDB
db.users.createIndex({ email: 1 })

// 2. Usé lean() para queries de solo lectura
const users = await User.find({ 
  email: req.query.email 
}).lean(); // 40% más rápido`
            }
          },
          {
            title: "2. Implementación de Redis para Caching",
            content: "Para datos que no cambian frecuentemente, Redis fue un game changer.",
            code: {
              language: "javascript",
              snippet: `const redis = require('redis');
const client = redis.createClient();

// Middleware de caching
const cacheMiddleware = (duration) => async (req, res, next) => {
  const key = \`cache:\${req.originalUrl}\`;
  
  try {
    const cached = await client.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.originalJson = res.json;
    res.json = (data) => {
      client.setex(key, duration, JSON.stringify(data));
      res.originalJson(data);
    };
    next();
  } catch (err) {
    next();
  }
};

// Uso: cachea por 5 minutos
app.get('/api/products', cacheMiddleware(300), getProducts);`
            }
          },
          {
            title: "3. Paginación y Lazy Loading",
            content: "Nunca devuelvas TODO. Implementa paginación desde el día 1.",
            code: {
              language: "javascript",
              snippet: `// Paginación eficiente
app.get('/api/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find()
      .select('name email avatar') // Solo campos necesarios
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments()
  ]);

  res.json({
    users,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit)
    }
  });
});`
            }
          },
          {
            title: "4. Connection Pooling y Cluster Mode",
            content: "Node.js es single-threaded. Usa todos los cores de tu CPU.",
            code: {
              language: "javascript",
              snippet: `const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(\`Worker \${worker.id} died, restarting...\`);
    cluster.fork();
  });
} else {
  // Tu aplicación Express
  const app = require('./app');
  app.listen(3000);
}

// MongoDB connection pooling
mongoose.connect(uri, {
  maxPoolSize: 50, // Aumenta el pool
  minPoolSize: 10
});`
            }
          },
          {
            title: "5. Compresión y GZIP",
            content: "Reduce el tamaño de las respuestas HTTP.",
            code: {
              language: "javascript",
              snippet: `const compression = require('compression');

app.use(compression({
  level: 6, // Nivel de compresión (0-9)
  threshold: 1024, // Solo comprimir > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));`
            }
          }
        ],
        results: [
          "⚡ Tiempo de respuesta: 5s → 500ms (-90%)",
          "📊 Requests manejados: 1,000/min → 10,000/min (+900%)",
          "💰 Costos de servidor: -60%",
          "😊 Satisfacción de usuario: +85%"
        ],
        conclusion: "La optimización es un proceso iterativo. Mide primero, optimiza después. Estas técnicas me permitieron escalar una aplicación de 1,000 a 10,000 usuarios sin aumentar la infraestructura. El impacto en el negocio fue inmediato y medible."
      }
    },
    {
      id: 2,
      title: "WebSockets en React: Chat en Tiempo Real que Escala",
      subtitle: "Arquitectura completa de un sistema de chat para 3,000+ usuarios simultáneos",
      author: "Nahuel Obregón",
      date: "8 Enero 2025",
      readTime: "12 min",
      category: "Real-Time",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      tags: ["Socket.IO", "React", "WebSockets", "Scalability"],
      excerpt: "Lecciones aprendidas construyendo GameXperience: una plataforma social con chat en tiempo real que soporta miles de usuarios concurrentes.",
      content: {
        intro: "Construir un chat que funcione para 10 usuarios es fácil. Hacerlo escalar a 3,000 usuarios simultáneos sin degradación es otro juego. Aquí te muestro la arquitectura exacta que usé en GameXperience.",
        sections: [
          {
            title: "1. Arquitectura de Rooms y Namespaces",
            content: "No pongas a todos los usuarios en el mismo socket. Divide y vencerás.",
            code: {
              language: "javascript",
              snippet: `// Backend: server.js
const io = require('socket.io')(server, {
  cors: { origin: process.env.CLIENT_URL },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Namespace por comunidad (escala mejor)
const communityNamespace = io.of('/community');

communityNamespace.on('connection', (socket) => {
  socket.on('join-community', ({ communityId, userId }) => {
    const room = \`community-\${communityId}\`;
    socket.join(room);
    
    // Solo notifica a usuarios en esta room
    socket.to(room).emit('user-joined', { userId });
  });
  
  socket.on('send-message', ({ communityId, message }) => {
    const room = \`community-\${communityId}\`;
    communityNamespace.to(room).emit('new-message', message);
  });
});`
            }
          },
          {
            title: "2. React Hook Personalizado para Socket.IO",
            content: "Encapsula toda la lógica de Socket.IO en un hook reutilizable.",
            code: {
              language: "javascript",
              snippet: `// hooks/useSocket.js
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (namespace = '/') => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io(\`\${process.env.REACT_APP_API_URL}\${namespace}\`, {
      auth: { token: localStorage.getItem('token') },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [namespace]);

  return { socket: socketRef.current, isConnected };
};

// Uso en componente
function ChatRoom({ communityId }) {
  const { socket, isConnected } = useSocket('/community');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit('join-community', { communityId });
    
    socket.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('new-message');
    };
  }, [socket, isConnected, communityId]);
}`
            }
          },
          {
            title: "3. Throttling y Debouncing para Eventos",
            content: "No envíes cada keystroke. Optimiza con throttling.",
            code: {
              language: "javascript",
              snippet: `import { useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';

function ChatInput({ socket, roomId }) {
  // Throttle: "usuario está escribiendo"
  const emitTyping = useRef(
    throttle(() => {
      socket.emit('typing', { roomId });
    }, 2000) // Solo cada 2 segundos
  ).current;

  // Debounce: guardado de draft
  const saveDraft = useRef(
    debounce((text) => {
      socket.emit('save-draft', { roomId, text });
    }, 500)
  ).current;

  const handleChange = (e) => {
    const text = e.target.value;
    emitTyping();
    saveDraft(text);
  };

  return <input onChange={handleChange} />;
}`
            }
          },
          {
            title: "4. Manejo de Reconexión Automática",
            content: "Los usuarios pierden conexión. Tu app debe manejarlo elegantemente.",
            code: {
              language: "javascript",
              snippet: `// Backend: Guardar mensajes no entregados
const pendingMessages = new Map();

socket.on('send-message', async (message) => {
  try {
    // Guardar en DB primero
    const saved = await Message.create(message);
    
    // Intentar enviar en tiempo real
    const delivered = io.to(message.roomId).emit('new-message', saved);
    
    if (!delivered) {
      // Si falla, guardar para reenvío
      if (!pendingMessages.has(message.userId)) {
        pendingMessages.set(message.userId, []);
      }
      pendingMessages.get(message.userId).push(saved);
    }
  } catch (error) {
    socket.emit('message-error', { error: error.message });
  }
});

// Reenviar mensajes pendientes al reconectar
socket.on('reconnect', (userId) => {
  const pending = pendingMessages.get(userId) || [];
  pending.forEach(msg => {
    socket.emit('new-message', msg);
  });
  pendingMessages.delete(userId);
});`
            }
          },
          {
            title: "5. Optimización de Performance con Virtual Scrolling",
            content: "No renderices 10,000 mensajes. Usa virtualización.",
            code: {
              language: "javascript",
              snippet: `import { FixedSizeList } from 'react-window';

function MessageList({ messages }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <Message message={messages[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={messages.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}`
            }
          }
        ],
        results: [
          "👥 Usuarios simultáneos: 3,000+ sin degradación",
          "⚡ Latencia de mensajes: <100ms en promedio",
          "📶 Tasa de reconexión exitosa: 98%",
          "💾 Uso de memoria del servidor: -40%",
          "🎯 Satisfacción de usuario: 95%"
        ],
        conclusion: "Socket.IO es poderoso, pero necesita arquitectura cuidadosa para escalar. Rooms, namespaces, throttling y manejo de reconexión son esenciales. Con estas técnicas, GameXperience maneja miles de usuarios sin sudar."
      }
    },
    {
      id: 3,
      title: "Deploy Full-Stack en 2025: De Zero a Producción",
      subtitle: "Guía completa: React + Node.js + MongoDB en Netlify, Render y MongoDB Atlas",
      author: "Nahuel Obregón",
      date: "2 Enero 2025",
      readTime: "10 min",
      category: "DevOps",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      tags: ["DevOps", "Deploy", "CI/CD", "Production"],
      excerpt: "Tutorial paso a paso para deployar una aplicación full-stack completa, desde configuración hasta monitoreo en producción.",
      content: {
        intro: "Desarrollar una app es solo el 50% del trabajo. Llevarla a producción de manera profesional, segura y escalable es la otra mitad. Aquí te muestro mi stack de deployment que uso en todos mis proyectos.",
        sections: [
          {
            title: "1. Preparación del Backend (Node.js + Express)",
            content: "Configura tu backend para producción. Variables de entorno y seguridad primero.",
            code: {
              language: "javascript",
              snippet: `// server.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

const app = express();

// Seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));

// Performance
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100 // max 100 requests
});
app.use('/api/', limiter);

// Health check (importante para Render)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
            }
          },
          {
            title: "2. MongoDB Atlas: Base de Datos en la Nube",
            content: "Configura MongoDB Atlas con réplicas y backup automático.",
            code: {
              language: "javascript",
              snippet: `// config/database.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB connected successfully');
    
    // Event listeners para monitoreo
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;`
            }
          },
          {
            title: "3. Deploy Backend en Render",
            content: "Render es gratuito, automático y perfecto para Node.js.",
            code: {
              language: "yaml",
              snippet: `# render.yaml
services:
  - type: web
    name: portfolio-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false # Variable secreta
      - key: JWT_SECRET
        generateValue: true # Genera automáticamente
      - key: ALLOWED_ORIGINS
        value: https://tudominio.com
    healthCheckPath: /health
    autoDeploy: true
    
# En Render Dashboard:
# 1. Conecta tu repositorio de GitHub
# 2. Selecciona rama main
# 3. Render detecta Node.js automáticamente
# 4. Agrega variables de entorno
# 5. ¡Deploy automático en cada push!`
            }
          },
          {
            title: "4. Deploy Frontend en Netlify",
            content: "Netlify es perfecta para React: CDN global, SSL automático, deploy en segundos.",
            code: {
              language: "toml",
              snippet: `# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

# Variables de entorno en Netlify Dashboard:
# VITE_API_URL=https://tu-api.render.com
# VITE_APP_NAME=Mi Portfolio

# Deploy automático:
# 1. Conecta repo en Netlify
# 2. Build command: npm run build
# 3. Publish directory: dist
# 4. Deploy automático en cada push a main`
            }
          },
          {
            title: "5. Variables de Entorno y Secretos",
            content: "Nunca hardcodees secretos. Usa .env y gestión segura.",
            code: {
              language: "bash",
              snippet: `# .env.example (commitea esto)
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your_jwt_secret_here
SENDGRID_API_KEY=your_sendgrid_key

# .env (NO commitees esto - está en .gitignore)
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/prod
JWT_SECRET=super_secure_random_string_generate_with_crypto
SENDGRID_API_KEY=SG.actual_api_key_here

# Genera secretos seguros:
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# En React (Vite):
# .env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Mi App

# Acceso en código:
const apiUrl = import.meta.env.VITE_API_URL;`
            }
          },
          {
            title: "6. CI/CD con GitHub Actions",
            content: "Automatiza testing y deploy con GitHub Actions.",
            code: {
              language: "yaml",
              snippet: `# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_TOKEN }}
          NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod`
            }
          },
          {
            title: "7. Monitoreo y Logging",
            content: "Monitorea tu aplicación en producción. No vueles a ciegas.",
            code: {
              language: "javascript",
              snippet: `// utils/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;

// Uso:
app.use((err, req, res, next) => {
  logger.error(\`\${err.status || 500} - \${err.message} - \${req.originalUrl} - \${req.method} - \${req.ip}\`);
  res.status(err.status || 500).json({ error: err.message });
});`
            }
          }
        ],
        results: [
          "🚀 Deploy automático en <2 minutos",
          "🌍 CDN global con SSL incluido",
          "📊 Monitoreo y logs centralizados",
          "💰 Costo: $0-15/mes para proyectos pequeños",
          "⚡ Uptime: 99.9% garantizado",
          "🔄 CI/CD completo con GitHub Actions"
        ],
        conclusion: "Este es mi stack de deployment para 2025. Profesional, escalable, y sorprendentemente económico. Netlify + Render + MongoDB Atlas es la combinación perfecta para aplicaciones full-stack modernas. Todos mis proyectos usan esta arquitectura."
      }
    }
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
            Blog Técnico
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tutoriales, experiencias y lecciones aprendidas desarrollando aplicaciones en producción
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full Articles */}
          {articles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-16"
              id={`article-${article.id}`}
            >
              {/* Header */}
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span className="inline-block px-3 py-1 bg-green-500 rounded-full text-sm font-medium mb-4">
                    {article.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h2>
                  <p className="text-lg text-gray-200 mb-4">{article.subtitle}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>👤 {article.author}</span>
                    <span>📅 {article.date}</span>
                    <span>⏱️ {article.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gradient-to-r from-green-50 to-teal-50 text-gray-700 rounded-lg text-sm font-medium border border-green-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Intro */}
                <p className="text-lg text-gray-700 leading-relaxed mb-12">
                  {article.content.intro}
                </p>

                {/* Sections */}
                <div className="space-y-12">
                  {article.content.sections.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800">
                        {section.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {section.content}
                      </p>
                      {section.code && (
                        <div className="bg-gray-900 rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                            <span className="text-gray-400 text-sm font-mono">
                              {section.code.language}
                            </span>
                            <button className="text-gray-400 hover:text-white text-sm">
                              Copiar código
                            </button>
                          </div>
                          <pre className="p-6 overflow-x-auto">
                            <code className="text-green-400 text-sm font-mono">
                              {section.code.snippet}
                            </code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Results */}
                <div className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 border border-green-200">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">
                    📊 Resultados
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {article.content.results.map((result, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
                        {result}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conclusion */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    💡 Conclusión
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {article.content.conclusion}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-12 shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Quieres aprender más?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Comparto constantemente tips y experiencias. Sígueme en LinkedIn o contáctame para charlar sobre tecnología
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Contactar
            </Link>
            <a
              href="https://www.linkedin.com/in/nahuel-obregon-3b458a268/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Sígueme en LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
