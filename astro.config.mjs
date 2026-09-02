import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://corepalm.cl',
  compressHTML: true,
  build: {
    format: 'directory'
  }
});
