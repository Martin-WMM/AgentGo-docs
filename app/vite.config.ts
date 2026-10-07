import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages uses /AgentGo-docs/; Docker/TEST gateway serves under /docs/.
  base: process.env.VITE_BASE || '/AgentGo-docs/',
  plugins: [vue(), tailwindcss()],
});
