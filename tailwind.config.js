/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        ink: '#000000',
        surface: '#0a0a0a',
        line: '#262626',
        muted: '#737373',
        // Legacy aliases kept so any leftover class names still resolve.
        accent: '#ffffff',
        gold: '#a3a3a3',
        'accent-primary': '#ffffff',
        'accent-secondary': '#a3a3a3',
        'bg-dark': '#000000',
        'surface-dark': '#0a0a0a',
        'text-light': '#d4d4d4',
      },
      fontFamily: {
        sans: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
