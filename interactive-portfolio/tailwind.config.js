/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Source Code Pro', 'monospace'],
      },
      backdropFilter: {
        'blur-lg': 'blur(16px)',
        'blur-2xl': 'blur(24px)',
      },
      animation: {
        'nebula': 'nebula-flow 20s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'nebula-flow': {
          '0%, 100%': { backgroundPosition: '0% 0%, 100% 100%, 50% 50%' },
          '33%': { backgroundPosition: '100% 100%, 0% 0%, 75% 25%' },
          '66%': { backgroundPosition: '50% 50%, 75% 25%, 25% 75%' },
        },
        'glow': {
          '0%': { textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.6)' },
          '100%': { textShadow: '0 0 30px rgba(168, 85, 247, 1), 0 0 60px rgba(168, 85, 247, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}