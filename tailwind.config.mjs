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
    'grid-cols-1', 'md:grid-cols-1', 'lg:grid-cols-1', 'xl:grid-cols-1', '2xl:grid-cols-1',
    'grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-2', 'xl:grid-cols-2', '2xl:grid-cols-2',
    'grid-cols-3', 'md:grid-cols-3', 'lg:grid-cols-3', 'xl:grid-cols-3', '2xl:grid-cols-3',
    'grid-cols-4', 'md:grid-cols-4', 'lg:grid-cols-4', 'xl:grid-cols-4', '2xl:grid-cols-4',
    'grid-cols-5', 'md:grid-cols-5', 'lg:grid-cols-5', 'xl:grid-cols-5', '2xl:grid-cols-5',
    'grid-cols-6', 'md:grid-cols-6', 'lg:grid-cols-6', 'xl:grid-cols-6', '2xl:grid-cols-6',
    'grid-cols-7', 'md:grid-cols-7', 'lg:grid-cols-7', 'xl:grid-cols-7', '2xl:grid-cols-7',
    'grid-cols-8', 'md:grid-cols-8', 'lg:grid-cols-8', 'xl:grid-cols-8', '2xl:grid-cols-8',
    'grid-cols-9', 'md:grid-cols-9', 'lg:grid-cols-9', 'xl:grid-cols-9', '2xl:grid-cols-9',
    'grid-cols-10', 'md:grid-cols-10', 'lg:grid-cols-10', 'xl:grid-cols-10', '2xl:grid-cols-10',
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
