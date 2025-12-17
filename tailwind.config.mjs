/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  safelist: [
    'bg-teal-600', 'dark:bg-teal-500', 'bg-teal-500', 'dark:bg-teal-400',
    'bg-blue-600', 'dark:bg-blue-500', 'bg-blue-500', 'dark:bg-blue-400',
    'bg-purple-600', 'dark:bg-purple-500', 'bg-purple-500', 'dark:bg-purple-400',
    'bg-red-600', 'dark:bg-red-500', 'bg-red-500', 'dark:bg-red-400',
    'bg-green-600', 'dark:bg-green-500', 'bg-green-500', 'dark:bg-green-400',
    'bg-indigo-600', 'dark:bg-indigo-500', 'bg-indigo-500', 'dark:bg-indigo-400',
    'bg-orange-600', 'dark:bg-orange-500', 'bg-orange-500', 'dark:bg-orange-400',
    'bg-amber-600', 'dark:bg-amber-500', 'bg-amber-500', 'dark:bg-amber-400',
  ],
  theme: {
    extend: {
      colors: {
        'background-base': 'var(--background-base)',
        'background-radial-gradient-1': 'var(--background-radial-gradient-1)',
        'background-blob-1': 'var(--background-blob-1)',
        'background-blob-2': 'var(--background-blob-2)',
      }
    },
  },
  plugins: [],
};

export default config;
