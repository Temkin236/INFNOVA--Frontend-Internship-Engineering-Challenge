import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6A00',
          600: '#E75A00',
          400: '#FF8A4B',
        },
        muted: '#F3F4F6',
        card: '#FFFFFF',
        accent: '#10B981',
        'text-primary': '#0F1724',
        'text-secondary': '#6B7280',
        footer: '#0B1220',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 6px 18px rgba(15,23,36,0.06)',
      },
      spacing: {
        'container-x': '64px',
      },
      borderRadius: {
        'lg-2xl': '12px',
      },
    },
  },
}

export default config
