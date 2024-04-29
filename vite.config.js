import autoprefixer from 'autoprefixer';
import path from 'path';

export default {
  server: {
    host: true,
    port: 8080,
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@modal': path.resolve(__dirname, './src/modal'),
      '@literals': path.resolve(
        __dirname,
        './src/assets/strings/literals.json',
      ),
    },
  },
};
