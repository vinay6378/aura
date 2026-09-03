export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07070f',
        panel: '#10101c',
        line: '#2a2a44',
        cyan: '#22d3ee',
        violet: '#8b5cf6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
