/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
      // 색상
      colors: {
        // 높은 숫자일수록 색이 진함
        primary: {
          100: '#FFF0ED', // P10
          200: '#FFE2DB', // P20
          300: '#FFC5B6', // 3번째 컬러
          400: '#FFA892', // P40
          500: '#FF8B6E', // P60
          600: '#FF6E49', // P80
          700: '#F45F3A', // P100
          800: '#EE4C23', // Pclick
        },
        black: {
          100: '#FBFBFB',
          200: '#E9E6E6',
          300: '#D4D0D0',
          400: '#AFA9A9',
          500: '#7A7272',
          600: '#4E4646',
          700: '#1A1A1A', // gray/G100
        },
        yellow: {
          100: '#FEF9D6',
          200: '#FEF3AE',
          300: '#FDEA71',
          400: '#FCE134'
        },
      },

      // 폰트
      fontFamily: {
      yangjin: ['yangjin'],
      },

      // 폰트 사이즈
      fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }], // 0.75rem = 12px
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],// 0.875rem = 14px
      'base': ['1rem', { lineHeight: '1.5rem' }], // 1rem = 16px
      'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 1.125rem = 18px
      'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 1.25rem = 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }], // 1.5rem = 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }] // 1.875rem = 30px
      },

      // 글 간격
      spacing: {
        '1': '0.25rem', // 4px
        '2': '0.5rem',  // 8px
        '3': '0.75rem', // 12px
        '4': '1rem',    // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem',  // 24px
        '8': '2rem',    // 32px
        '10': '2.5rem', // 40px
        '12': '3rem',   // 48px
        '16': '4rem'    // 64px
      },

      // 모서리 둥근 정도
      borderRadius: {
        md: '0.75rem',    // 12px
        lg: '1rem',       // 16px
        custom: '2rem'    // 커스텀 추가도 가능
      },
    }
  },
  plugins: [],
}

