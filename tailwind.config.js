/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        topColor: '#0D2847',
        bottomColor: '#2C5B83',
      },
      fontFamily: {
        nanumPen: ['nanumPen', 'nanumPen'],
      },
      backgroundImage: {
        'message-image': "url('./src/assets/images/messageModal.png')",
      },
    },
  },
  plugins: [],
};
