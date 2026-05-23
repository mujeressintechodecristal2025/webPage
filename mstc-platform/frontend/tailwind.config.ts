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
          DEFAULT: '#c4006b',
          light:   '#e0409a',
          dark:    '#8b0049',
        },
        cream:       '#fdf7f2',
        charcoal:    '#1a1a2e',
        'soft-grey': '#6b6b7b',
        gold:        '#d4a843',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Josefin Sans"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Valores custom que Tailwind no incluye por defecto
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderOpacity: {
        '8': '0.08',
        '12': '0.12',
        '15': '0.15',
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.8s ease both',
        'fade-in-right': 'fadeInRight 0.8s ease 0.15s both',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
        'float':         'float 3s ease-in-out infinite',
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
      },
      transitionDuration: {
        '400': '400ms',
      },
      backgroundOpacity: {
        '8': '0.08',
      },
    },
  },
  plugins: [],
} satisfies Config
