import path from 'path';
import { defineConfig } from 'vite';

const resolvePath = (...paths: string[]) => path.resolve(__dirname, ...paths);

const distPath = resolvePath('./dist');

export default defineConfig({
  resolve: {
    alias: {
      '@dist': distPath,
    },
  },
  build: {
    outDir: distPath,
    lib: {
      entry: resolvePath('./src/index.ts'),
      name: 'VueTaskReducer',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: (format: string): string => `vue-task-reducer.${format}.js`,
    },
  },
});
