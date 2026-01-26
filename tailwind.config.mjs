/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1900px',
        '4xl': '2560px'
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        brand: {
          navy: '#001862',
          blue: '#2F5494',
          sky: '#6E98DC',
          silver: '#B3B4B4'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F5F6F8'
        },
        ink: {
          DEFAULT: '#0B1220',
          muted: '#535E6E'
        }
      }
    }
  }
};

