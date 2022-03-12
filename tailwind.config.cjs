module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      display: ['Karla', 'sans-serif'],
      text: ['"Courier Prime"', 'sans-serif']
    },
    themes: {
      cream: {
        'primary': '#EEE2D2',
        'accent': '#6A735A',
        'bg-menu': '#6A735A',
        'fg-menu': '#EEE2D2',
        'bg-story': '#6A735A',
      }, 
      green: {
        'primary': '#6A735A',
        'accent': '#EEE2D2',
        'bg-menu': '#EEE2D2',
        'fg-menu': '#6A735A',
        'bg-story': '#EEE2D2',
      },
      red: {
        'primary': '#BC6E4D',
        'accent': '#EEE2D2',
        'bg-menu': '#EEE2D2',
        'fg-menu': '#BC6E4D',
        'bg-story': '#EEE2D2',
      },
      teal: {
        'primary': '#A7C4B0',
        'accent': '#6A735A',
        'bg-menu': '#6A735A',
        'fg-menu': '#EEE2D2',
        'bg-story': '#6A735A',
      },
      grey: {
        'primary': '#CCC8BC',
        'accent': '#BC6E4D',
        'bg-menu': '#BC6E4D',
        'fg-menu': '#EEE2D2',
        'bg-story': '#BC6E4D',
      }
    },
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',

      'primary': '#EEE2D2',
      'accent': '#6A735A',
      'bg-menu': '#6A735A',
      'fg-menu': '#EEE2D2',
      'bg-story': '#6A735A',

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
  plugins: [
    require('tailwind-theme-switcher')
  ],
}
