import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar variables de entorno con ruta explícita
const result = dotenv.config({ path: join(__dirname, '..', '.env') });

if (result.error) {
  console.error('❌ Error cargando archivo .env:', result.error);
} else {
  console.log('✅ Archivo .env cargado correctamente');
  console.log('📧 SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Configurada' : 'No configurada');
  console.log('📧 ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'No configurado');
  console.log('📧 FROM_EMAIL:', process.env.FROM_EMAIL || 'No configurado');
}

export default result;
