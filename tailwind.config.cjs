module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      display: ['Karla', 'sans-serif'],
      text: ['"Courier Prime"', 'sans-serif']
    },
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'primary': '#EEE2D2',
      'accent': '#6A735A',
      'black': '#000000',
      'white': '#ffffff',
    },
    extend: {
      fontSize: {
        'xxs': '0.5rem'
      },
      spacing: {
        'base': '1.5px'
      },
      borderWidth: {
        DEFAULT: '1.5px',
      }
    },
  },
  plugins: [],
}
