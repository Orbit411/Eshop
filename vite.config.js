import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/eshop/", // استبدل eshop باسم المشروع إذا كان مختلفًا
});
