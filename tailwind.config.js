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
        'message-image': "url('./public/messageModal.png')",
      },
      fontFamily: {
        PartialSans: ['PartialSansKR-Regular'],
        Jiptokki: ['HSJiptokki-Black'],
        Taebaek: ['TAEBAEKmilkyway'],
        Consolas: ['Consolas'],
        Wanju: ['TTWanjudaedunsancheB'],
        nanumPen: ['nanumPen', 'nanumPen'],
        Climate: ['Climate'],
      },
    },
  },
  plugins: [],
};
