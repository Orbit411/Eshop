import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // لا تستخدم "/eshop/" هنا، فقط "/" لـ Vercel
});
