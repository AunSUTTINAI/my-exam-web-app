import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

//! === แก้ปัญหา __dirname สำหรับ ESM ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      // '@pages': path.resolve(__dirname, './src/pages'),
      // '@hooks': path.resolve(__dirname, './src/hooks'),
      // '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
