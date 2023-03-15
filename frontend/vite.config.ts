import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 8000,
    open: true,
    host: process.env.HOST || '0.0.0.0'
  },
  resolve: { alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }] },
  define: { 'process.env': {} }
});
