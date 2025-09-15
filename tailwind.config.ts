import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#7C56EC',
          500: '#5B2CE7',
          1000: '#1D0A57',
        },
        secondary: {
          500: '#DE2B58',
        },
        neutral: {
          100: '#F5F5F5',
          700: '#565454',
          1000: '#111111',
        },
      },
      fontFamily: {
        'instrument': ['"Instrument Sans"', 'sans-serif'],
        'delicious': ['"Delicious Handrawn"', 'cursive'],
        'sans': ['"Instrument Sans"', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '120%', letterSpacing: '-1.44px' }],
        'gls': ['80px', { lineHeight: '100%', letterSpacing: '1.6px' }],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gls-inset': 'inset 2px 3px 4px rgba(255, 255, 255, 0.3), inset -2px -3px 4px rgba(0, 0, 0, 0.05)',
        'gls-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config;