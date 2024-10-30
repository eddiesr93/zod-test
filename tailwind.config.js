/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  compilerOptions: {
    module: 'esnext',
    target: 'esnext',
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
