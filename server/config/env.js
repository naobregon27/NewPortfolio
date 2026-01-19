import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta del archivo .env
const envPath = join(__dirname, '..', '.env');

// Solo intentar cargar .env si el archivo existe (útil en desarrollo)
// En producción (Render, etc.) las variables se configuran directamente en el entorno
let result = { error: null };
if (existsSync(envPath)) {
  result = dotenv.config({ path: envPath });
  if (result.error) {
    console.error('❌ Error cargando archivo .env:', result.error);
  } else {
    console.log('✅ Archivo .env cargado correctamente');
  }
} else {
  console.log('ℹ️  Archivo .env no encontrado, usando variables de entorno del sistema');
}

// Mostrar estado de configuración (sin mostrar valores sensibles)
console.log('📧 SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Configurada' : 'No configurada');
console.log('📧 ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'No configurado');
console.log('📧 FROM_EMAIL:', process.env.FROM_EMAIL || 'No configurado');

export default result;
