import { lingui } from '@lingui/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({ plugins: [['@lingui/swc-plugin', {}]] }),
    lingui(),
    svgr(),
    tailwindcss(),
  ],
  server: {
    port: 8000,
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  },
});
