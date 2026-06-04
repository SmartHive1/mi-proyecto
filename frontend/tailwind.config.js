/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1A120B',
        'bg-secondary': '#2A1B13',
        'bg-card': '#231710',
        'color-primary': '#F5A623',
        'color-accent': '#3AC2FF',
        'text-primary': '#FFF8ED',
        'text-muted': '#80756A',
        'status-error': '#E53935',
        'status-ok': '#4CAF50',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
