import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react', // ?react 쿼리 처리
      svgrOptions: {
        replaceAttrValues: {
          '#AFA9A9': '{props.fill}',
          '#F45F3A': '{props.fill}',
        },
      },
    }),
  ],
});