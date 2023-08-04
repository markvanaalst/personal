const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        sm: '540px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        // uses `next/font` see `app/layout.tsx`
        sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        white: '#ffffff',
        transparent: 'transparent',
        currentColor: 'currentColor',
        'theme-text': 'var(--theme-text)',
        'theme-text-alt': 'var(--theme-text-alt)',
        'theme-link-hover': 'var(--theme-link-hover)',
        'theme-bg': 'var(--theme-bg)',
        'theme-bg-alt': 'var(--theme-bg-alt)',
        'theme-outline': 'var(--theme-outline)',
        'theme-border': 'var(--theme-border)',
        'theme-border-alt': 'var(--theme-border-alt)',
        // change your color schema here
        primary: {
          100: '#f1e9ff',
          200: '#e3d3ff',
          300: '#d4bdff',
          400: '#c6adff',
          500: '#b192ff',
          600: '#876adb',
          700: '#6249b7',
          800: '#422e93',
          900: '#2b1c7a',
        },
        blue: {
          50: '#ebeff3',
          100: '#d6e0e8',
          200: '#adc0d1',
          300: '#85a1b9',
          400: '#5c81a2',
          500: '#33628b',
          600: '#294e6f',
          700: '#1f3b53',
          800: '#142738',
          900: '#0a141c',
        },
        blackAlpha: {
          50: 'rgba(0,0,0,0.03)',
          100: 'rgba(0,0,0,0.07)',
          200: 'rgba(0,0,0,0.10)',
          300: 'rgba(0,0,0,0.17)',
          400: 'rgba(0,0,0,0.36)',
          500: 'rgba(0,0,0,0.36)',
          600: 'rgba(0,0,0,0.68)',
          700: 'rgba(0,0,0,0.75)',
          800: 'rgba(0,0,0,0.85)' /* Normal text */,
          900: 'rgba(0,0,0,0.96)',
        },
        whiteAlpha: {
          50: 'rgba(255,255,255,0.03)',
          100: 'rgba(255,255,255,0.07)',
          200: 'rgba(255,255,255,0.10)',
          300: 'rgba(255,255,255,0.17)',
          400: 'rgba(255,255,255,0.36)',
          500: 'rgba(255,255,255,0.55)',
          600: 'rgba(255,255,255,0.68)',
          700: 'rgba(255,255,255,0.75)',
          800: 'rgba(255,255,255,0.85)',
          900: 'rgba(255,255,255,0.96)',
        },
      },
      fontSize: {
        // 12px
        '2xs': '0.75rem',
        // 14px
        xs: '0.875rem',
        // 16px
        sm: '0.95rem',
        // 18px
        base: '1rem',
        // 20px
        lg: '1.25rem',
        // 24px
        xl: '1.5rem',
        // 36px
        '2xl': '2.25rem',
        // 48px
        '3xl': '3rem',
        // 60px
        '4xl': '3.75rem',
      },
      minWidth: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
      },
      minHeight: {
        500: '500px',
        420: '420px',
        320: '320px',
        220: '220px',
        120: '120px',
      },
      transitionProperty: {
        common:
          'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform',
      },
      transitionDuration: {
        'ultra-fast': '50ms',
        faster: '100ms',
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
        slower: '400ms',
        'ultra-slow': '500ms',
      },
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        dark: '0 2px 4px 0 rgba(0, 0, 0, 0.8)',
        ['lg-dark']: '0 15px 15px 0 rgba(0, 0, 0, 0.8)',
        ['md-dark']: '0 0 12px 0 rgba(0, 0, 0, 0.8)',
        ['theme']: 'var(--theme-shadow)',
        ['theme-md']: 'var(--theme-shadow-md)',
        ['theme-lg']: 'var(--theme-shadow-lg)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
