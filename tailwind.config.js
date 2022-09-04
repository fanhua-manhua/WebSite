const BLOG = require('./blog.config')
const fontFamilies = require('./lib/font')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js', './themes/**/*.js'],
  darkMode: BLOG.APPEARANCE === 'class' ? 'media' : 'class', // or 'media' or 'class'
  theme: {
    fontFamily: fontFamilies,
    extend: {
      colors: {
        day: {
          DEFAULT: BLOG.BACKGROUND_LIGHT || '#ffffff'
        },
        night: {
          DEFAULT: BLOG.BACKGROUND_DARK || '#42454b' //111827
        },
        hexo: {
          'background-gray': '#ece8e8', //f5f5f5
          'black-gray': '#424242', //101414
          'light-gray': '#c7c7c7' //e5e5e5
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
