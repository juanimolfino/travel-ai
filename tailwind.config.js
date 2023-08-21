/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('images/perfil.jpeg')",
      },
      fontFamily: {
        soehne: ['TestSöhneMono', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
