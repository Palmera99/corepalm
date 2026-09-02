import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://palmera99.github.io',
  base: '/corepalm',
  compressHTML: true,
  build: {
    format: 'directory'
  }
});
