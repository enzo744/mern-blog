/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx,mjs,mjs.map}',
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin'), require('tailwind-scrollbar')],
};

// 
// 'node_modules/flowbite-react/dist/esm/components/**/*.{js,jsx,ts,tsx,mjs,mjs.map}',