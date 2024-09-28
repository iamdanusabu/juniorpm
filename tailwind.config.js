/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6f1ff',
          // ... add other shades as needed
        },
        // ... add other color extensions as needed
      },
    },
  },
  plugins: [],
};
