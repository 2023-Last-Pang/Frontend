/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        topColor: '#0D2847',
        bottomColor: '#2C5B83',
      },
      backgroundImage: {
        'message-image': "url('./assets/images/messageModal.png')",
      },
      fontFamily: {
        PartialSans: ['PartialSansKR-Regular'],
        Jiptokki: ['HSJiptokki-Black'],
        Taebaek: ['TAEBAEKmilkyway'],
        Consolas: ['Consolas'],
        Wanju: ['TTWanjudaedunsancheB'],
        nanumPen: ['nanumPen', 'nanumPen'],
        Climate: ['Climate'],
        omyu_pretty: ['omyu_pretty'],
      },
    },
  },
  plugins: [],
};
