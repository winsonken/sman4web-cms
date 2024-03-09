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
        black: '#222222',
        'main-blue': '#7FC7D9',
        'second-blue': '#146C94',
        'main-cream': '#FFFDDE',
        'main-gray': '#F5F5F5',
        'main-red': '#BF3131',
        'main-orange': '#FFE4B5',
        'second-orange': '#F5F5DC',
        'modal-bg': 'rgb(34,34,34,0.3)',
      },
    },
  },
  plugins: [],
};
