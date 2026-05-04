/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: '#3b2a1a',
        accent: '#c0392b',
        'bg-light': '#f5f0eb',
        'surface': '#ffffff',
        'text-primary': '#2d2d2d',
        'text-muted': '#888888',
        'border': '#e0d8d0',
        'success': '#155724',
        'success-bg': '#d4edda',
        'error': '#721c24',
        'error-bg': '#f8d7da',
        'info-bg': '#fff3cd',
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
      },
      boxShadow: {
        DEFAULT: '0 2px 12px rgba(0,0,0,0.08)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
