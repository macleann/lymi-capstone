/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        lymipurple: {
          100: '#B283D0',
          200: '#9E62BE',
          300: '#8940AC',
          400: '#752E9A',
          500: '#6033AC',
          600: '#4C2B8F',
          700: '#381E6D',
          800: '#26124A',
          900: '#130A28',
        },
        lymiblue: {
          100: '#B3CBE3',
          200: '#8AAED6',
          300: '#6191C9',
          400: '#3874BC',
          500: '#5E85C4',
          600: '#235CAE',
          700: '#1A4786',
          800: '#11315F',
          900: '#091B38',
        },
        lymisalmon: {
          100: '#FAD5C8',
          200: '#F5B0A5',
          300: '#F08B82',
          400: '#EB675F',
          500: '#F48263',
          600: '#CF2E2E',
          700: '#A22221',
          800: '#7A1919',
          900: '#540F11',
        },
        lymigreen: {
          100: '#C8DEB1',
          200: '#A2C88C',
          300: '#7CB266',
          400: '#56A641',
          500: '#78B62B',
          600: '#579021',
          700: '#3D6819',
          800: '#234E11',
          900: '#0F3408',
        }
      },
      fontFamily: {
        body: ['Merriweather Sans']
      }
    },
  },
  plugins: [],
}
