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
        'menu-primary': '#6A735A',
        'menu-accent': '#EEE2D2',
        'story-accent': '#6A735A',
        'contrast': '#000002',
      }, 
      green: {
        'primary': '#6A735A',
        'accent': '#EEE2D2',
        'menu-primary': '#EEE2D2',
        'menu-accent': '#6A735A',
        'story-accent': '#EEE2D2',
        'contrast': '#EEE2D2',
      },
      red: {
        'primary': '#BC6E4D',
        'accent': '#EEE2D2',
        'menu-primary': '#EEE2D2',
        'menu-accent': '#BC6E4D',
        'story-accent': '#EEE2D2',
        'contrast': '#EEE2D2',
      },
      teal: {
        'primary': '#A7C4B0',
        'accent': '#6A735A',
        'menu-primary': '#6A735A',
        'menu-accent': '#EEE2D2',
        'story-accent': '#6A735A',
        'contrast': '#000000',
      },
      grey: {
        'primary': '#CCC8BC',
        'accent': '#BC6E4D',
        'menu-primary': '#BC6E4D',
        'menu-accent': '#EEE2D2',
        'story-accent': '#BC6E4D',
        'contrast': '#000000',
      }
    },
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',

      'primary': '#EEE2D2',
      'accent': '#6A735A',
      'menu-primary': '#6A735A',
      'menu-accent': '#EEE2D2',
      'story-accent': '#6A735A',
      'contrast': '#000000',

      'black': '#000000',
      'white': '#ffffff',
    },
    stroke: {
      'transparent': 'transparent',
      'current': 'currentColor',

      'primary': '#EEE2D2',
      'accent': '#6A735A',
      'menu-primary': '#6A735A',
      'menu-accent': '#EEE2D2',
      'story-accent': '#6A735A',
      'contrast': '#00000',

      'black': '#000000',
      'white': '#ffffff',
    },
    divideColor: {
      'transparent': 'transparent',
      'current': 'currentColor',

      'primary': '#EEE2D2',
      'accent': '#6A735A',
      'menu-primary': '#6A735A',
      'menu-accent': '#EEE2D2',
      'story-accent': '#6A735A',
      'contrast': '#00000',

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
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    },
  },
  plugins: [
    require('tailwind-theme-switcher')
  ],
}
