/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        white: '#FFFFFF',
        'main-blue': '#7FC7D9',
        'second-blue': '#146C94',
        'main-cream': '#FFFDDE',
      },
    },
  },
  plugins: [],
};
