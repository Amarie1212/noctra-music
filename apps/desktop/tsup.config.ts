import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['electron/main.ts', 'electron/preload.ts'],
  format: ['cjs'],
  external: ['electron', 'better-sqlite3'],
  clean: true,
  outDir: 'dist-electron',
  noExternal: ['@music/core', 'music-metadata'],
});
