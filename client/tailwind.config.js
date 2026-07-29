/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#121212',      // page background
          surface: '#1B1B1B', // cards
          alt: '#202020',     // nav / footer band
          border: '#2A2A2A',
        },
        ink: {
          DEFAULT: '#F5F5F3', // primary text
          dim: '#9A9A9A',     // secondary text
          faint: '#6B6B6B',   // muted / captions
        },
        brand: {
          DEFAULT: '#FF7A3D', // orange accent
          hover: '#FF8F5C',
          dim: '#FF7A3D1a',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
