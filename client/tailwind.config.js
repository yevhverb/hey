module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    mode: 'all',
    content: ['./src/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        gray: {
          50: '#F5F5F5',
          100: '#EEEEEE',
          200: '#E0E0E0',
          300: '#BDBDBD',
          400: '#9E9E9E',
          500: '#757575',
          600: '#616161',
          700: '#424242',
          800: '#303030',
          900: '#212121',
        },
      },
      borderWidth: {
        3: '3px',
        6: '6px',
      },
      minWidth: {
        10: '2.5rem',
      },
      ringWidth: {
        3: '3px',
      },
      fontSize: {
        '4.5xl': ['2.5rem', { lineHeight: '2.75rem' }],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
