import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        marquee: ['Fraunces', 'ui-serif', 'serif'],
      },
      colors: {
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          glow:       'hsl(var(--primary-glow))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':       { transform: 'translateY(-18px) rotate(1.5deg)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%':       { transform: 'translate(40px,-50px) scale(1.08)' },
          '66%':       { transform: 'translate(-30px,25px) scale(0.96)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 30px hsl(var(--primary)/0.4)' },
          '50%':       { boxShadow: '0 0 70px hsl(var(--primary)/0.75)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.8)' },
          '50%':       { opacity: '1',    transform: 'scale(1.15)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%':       { transform: 'rotate(4deg)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.22s ease-out',
        'accordion-up':   'accordion-up 0.22s ease-out',
        float:        'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        blob:         'blob 18s ease-in-out infinite',
        aurora:       'aurora 24s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer:      'shimmer 3s linear infinite',
        twinkle:      'twinkle 2.6s ease-in-out infinite',
        wiggle:       'wiggle 3.5s ease-in-out infinite',
        marquee:      'marquee var(--marquee-duration, 28s) linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
