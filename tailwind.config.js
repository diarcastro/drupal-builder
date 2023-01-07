module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.js',
    './templates/**/*.{twig,html}',
    './patterns/**/*.{twig,html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  /* https://tailwindcss.com/docs/content-configuration#safelisting-classes */
  safelist: [],
};
