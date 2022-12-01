module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { 'brand-color': '#d16f4b' },
      borderRadius: { 'artisan-md': '40px' },
      boxShadow: { 'artisan-md': '0px 3px 21px 3px rgba(0,0,0,0.13)' },
      fill: (theme) => ({
        'brand-color': theme('colors.brand-color'),
        'brand-white': theme('colors.white')
      }),
      stroke: (theme) => ({
        'brand-color': theme('colors.brand-color'),
        'brand-white': theme('colors.white')
      }),
      screens: {
        xsss: '320px',
        xss: '375px',
        xs: '425px'
      },
      maxWidth: {
        'profil-miniature': '40px'
      }
    }
  },
  variants: {
    extend: {
      fill: ['hover', 'focus'],
      stroke: ['hover', 'focus']
    }
  },
  plugins: []
};
