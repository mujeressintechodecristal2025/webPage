import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        magenta: {
          DEFAULT: '#d834d4',
          light:   '#e96ee6',
          dark:    '#a020a0',
          vivid:   '#d801ff',
        },
        cream:       '#fdfbfe',
        charcoal:    '#1a0e1f',
        'soft-grey': '#6b5d6e',
        gold: {
          DEFAULT: '#dd6741',
          light:   '#f6a05e',
          dark:    '#903d37',
        },
        purple: {
          deep:    '#3e396b',
          dark:    '#220c27',
          muted:   '#6a283d',
        },
        rose: {
          50:  '#fef5fe',
          100: '#fce8fc',
          200: '#f9cff9',
          300: '#e96ee6',
          400: '#d834d4',
          500: '#b920b5',
          600: '#a020a0',
          700: '#7d1a7d',
          800: '#5c1360',
          900: '#3d0d40',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Josefin Sans"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.8s ease both',
        'fade-in-right': 'fadeInRight 0.8s ease 0.15s both',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
        'float':         'float 3s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 4px 20px rgba(37,211,102,0.35)' },
          '50%':      { boxShadow: '0 4px 32px rgba(37,211,102,0.65)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config
