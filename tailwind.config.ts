import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'serif'],
      },
      colors: {
        bg: '#f7f7f5',
        fg: '#1c1c1c',
        accent: '#2c5a8a',
        muted: '#919191',
        border: '#d8d8d6',
      },
    },
  },
  plugins: [],
}

export default config
