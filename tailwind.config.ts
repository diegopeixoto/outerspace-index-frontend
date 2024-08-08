import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'outer-space': "url('/assets/images/bg-forum-vip.jpg')",
        'topic-item': 'linear-gradient(180deg, #2D3037 36%, #424753 100%)',
      },
      backgroundPosition: {
        'center-50': '50% 50%',
      },
    },
  },
  plugins: [],
}
export default config
