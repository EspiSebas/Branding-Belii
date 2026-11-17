import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const htmlPages = readdirSync(projectRoot).filter((file) => file.endsWith('.html'));

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        htmlPages.map((file) => [file.replace(/\.html$/, ''), resolve(projectRoot, file)])
      )
    }
  }
});
