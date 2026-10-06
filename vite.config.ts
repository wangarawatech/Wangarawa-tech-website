import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function cloudflareSpaPlugin(): Plugin {
  return {
    name: 'cloudflare-spa-fallback',
    closeBundle() {
      try {
        const outDir = path.resolve(import.meta.dirname, 'dist');
        const indexPath = path.join(outDir, 'index.html');
        const fallbackPath = path.join(outDir, '200.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, fallbackPath);
        }
      } catch (err) {
        console.warn('Could not generate 200.html fallback:', err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cloudflareSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});