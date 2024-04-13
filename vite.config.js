import autoprefixer from 'autoprefixer';

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
};
