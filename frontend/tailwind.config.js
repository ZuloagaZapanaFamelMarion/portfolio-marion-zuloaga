/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111f',
        panel: '#0d1a2d',
        cyan: '#38bdf8',
        mint: '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 50px rgba(56, 189, 248, 0.12)',
      },
    },
  },
  plugins: [],
};
