/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#c1e8ff',
        secondary: '#e7bdb4',
        blue: '#74d1ff',
        primary: '#ffb4a4',
        'primary-container': '#8d1600',
        'on-primary': '#640d00',
        'surface-0': '#1b1412',
        surface: '#201a19',
        'surface-1': '#2b2220',
        'surface-2': '#322624',
        'surface-3': '#392b28',
        'surface-4': '#3b2c2a',
        'on-surface': '#ede0dd',
        'on-surface-variant': '#d8c2bd',
        'surface-variant': '#534340',
        border: '#534340',
        'border-strong': '#a08c88',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.on-surface'),
            'h1, h2, h3, h4': {
              color: theme('colors.on-surface'),
            },
            code: {
              color: theme('colors.light-blue'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
              opacity: '0.05',
            },
            pre: {
              boxShadow: 'none',
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: theme('colors.on-surface'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
