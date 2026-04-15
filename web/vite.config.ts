import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import fs from 'node:fs';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type Plugin, type ProxyOptions, type UserConfig } from 'vite';

const upstream = {
  target: process.env.IMMICH_SERVER_URL || 'http://immich-server:2283/',
  secure: true,
  changeOrigin: true,
  logLevel: 'info',
  ws: true,
};

const proxy: Record<string, string | ProxyOptions> = {
  '/api': upstream,
  '/.well-known/immich': upstream,
  '/custom.css': upstream,
};

/**
 * Plugin for developing with a local copy of @immich/ui.
 * Redirects @immich/ui imports to the local dist at /usr/ui/dist, and resolves
 * bare module imports (bits-ui, tailwind-merge, etc.) from the web project's
 * node_modules since the mounted /usr/ui has none of its own.
 * Returns undefined (no-op) if /usr/ui/dist is not present.
 * See: https://immich.app/docs/developer/setup
 */
function localUiPlugin(): Plugin | undefined {
  const localUiDist = '/usr/ui/dist';
  if (!fs.existsSync(localUiDist)) {
    return undefined;
  }

  console.log('@immich/ui: using local build from', localUiDist);

  // Resolve bare imports from the installed @immich/ui package location (following symlinks),
  // where pnpm has its dependencies available as siblings in the virtual store
  // eslint-disable-next-line unicorn/prefer-module
  const installedUiIndex = fs.realpathSync(path.join(__dirname, 'node_modules/@immich/ui/dist/index.js'));

  return {
    name: 'local-ui',
    enforce: 'pre',

    config() {
      return {
        resolve: {
          alias: {
            // Vite's internal CSS resolver and @tailwindcss/vite do not call
            // resolveId hooks, so imports from /usr/ui must be aliased here
            '@immich/ui': localUiDist,
            // eslint-disable-next-line unicorn/prefer-module
            tailwindcss: path.join(__dirname, 'node_modules/tailwindcss/index.css'),
          },
        },
        server: { fs: { allow: ['/usr/ui'] } },
      };
    },

    async resolveId(source, importer) {
      // Redirect @immich/ui to local dist
      if (source === '@immich/ui') {
        return path.join(localUiDist, 'index.js');
      }
      if (source.startsWith('@immich/ui/')) {
        return path.join(localUiDist, source.slice('@immich/ui/'.length));
      }

      // For files inside /usr/ui, resolve bare imports via the web project
      if (!importer) {
        return null;
      }
      const normalizedImporter = importer.split('?')[0];
      if (!normalizedImporter.startsWith('/usr/ui/')) {
        return null;
      }
      if (source.startsWith('.') || source.startsWith('/')) {
        return null;
      }
      // Re-resolve as if imported from the installed @immich/ui package,
      // so pnpm's virtual store siblings (bits-ui, tailwind-merge, etc.) are found
      const resolved = await this.resolve(source, installedUiIndex, { skipSelf: true });
      return resolved ?? null;
    },

  };
}

export default defineConfig({
  build: {
    target: 'es2022',
  },
  resolve: {
    alias: {
      'xmlhttprequest-ssl': './node_modules/engine.io-client/lib/xmlhttprequest.js',
      // eslint-disable-next-line unicorn/prefer-module
      '@test-data': path.resolve(__dirname, './src/test-data'),
    },
  },
  server: {
    // connect to a remote backend during web-only development
    proxy,
    allowedHosts: true,
  },
  preview: {
    proxy,
  },
  plugins: [
    localUiPlugin(),
    enhancedImages(),
    tailwindcss(),
    sveltekit(),
    process.env.BUILD_STATS === 'true'
      ? visualizer({
          emitFile: true,
          filename: 'stats.html',
        })
      : undefined,
    svelteTesting(),
  ],
  optimizeDeps: {
    entries: ['src/**/*.{svelte,ts,html}'],
  },
  test: {
    name: 'web:unit',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test-data/setup.ts'],
    sequence: {
      hooks: 'list',
    },
    env: {
      TZ: 'UTC',
    },
  },
} as UserConfig);
