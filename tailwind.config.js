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
        text: '#ede0dd',
        'on-surface-variant': '#d8c2bd',
        'surface-variant': '#534340',
        border: '#534340',
        'border-strong': '#a08c88',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
