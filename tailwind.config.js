/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04101F',   // darkest background (dark theme base)
          900: '#071A2E',   // dark surface
          800: '#0C2440',   // dark elevated card
          700: '#123356',
        },
        brand: {
          900: '#0B3A8C',   // deep brand blue (from logo wordmark)
          800: '#0F52BA',
          700: '#1565C0',
          600: '#1E88E5',
          500: '#2B9BE0',   // mid blue
          400: '#4FC0E8',
          300: '#7FD4F0',
          200: '#A9E4F7',
          100: '#D6F1FC',
          50:  '#EFF9FE',   // lightest wash (light theme base tint)
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #4FC0E8 0%, #2B9BE0 35%, #1565C0 70%, #0B3A8C 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(43, 155, 224, 0.25) 0%, transparent 70%)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-slow-reverse': 'spin-reverse 55s linear infinite',
        'spin-medium': 'spin 28s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite alternate',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%': { opacity: '0.4', transform: 'scale(0.95)' },
          '100%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
