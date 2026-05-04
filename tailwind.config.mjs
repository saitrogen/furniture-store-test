/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Public Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Nordic Earth - Primary colors
        'primary': '#241607',
        'primary-dark': '#3b2a1a',
        'secondary': '#6d5b4a',
        'tertiary': '#857260',

        // Surfaces (warm creams and greys)
        'surface': '#fff8f5',
        'surface-light': '#f9f2ef',
        'surface-lighter': '#f3ece9',
        'surface-lightest': '#ffffff',
        'surface-dim': '#dfd9d6',

        // Text colors
        'text-primary': '#1d1b19',
        'text-secondary': '#4e453e',
        'text-muted': '#857260',

        // Functional colors
        'brand': '#3b2a1a',
        'accent': '#ba1a1a',
        'success': '#155724',
        'border': '#d1c4ba',
        'border-light': '#e8e1de',
      },
      spacing: {
        gutter: '2.5rem',    // 40px
        section: '5rem',      // 80px
        'container-max': '1200px',
      },
      borderRadius: {
        DEFAULT: '0.5rem',    // 8px
        sm: '0.25rem',        // 4px
        md: '0.75rem',        // 12px
        lg: '1rem',           // 16px
        xl: '1.5rem',         // 24px
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        sm: '0 1px 4px rgba(0, 0, 0, 0.04)',
        DEFAULT: '0 2px 8px rgba(0, 0, 0, 0.06)',
        md: '0 4px 12px rgba(0, 0, 0, 0.08)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.10)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.6rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
    },
  },
  plugins: [],
};
