import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; // ¡Importa 'path' para resolver rutas!

export default defineConfig({
  plugins: [react()],
  
  // AÑADIR ESTA SECCIÓN PARA AYUDAR A RESOLVER DEPENDENCIAS
  resolve: {
    alias: {
      // Intenta resolver los paquetes directamente desde la raíz de node_modules
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react') 
    },
  },
});
