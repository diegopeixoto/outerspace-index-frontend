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
        'topic-item':
          'linear-gradient(180deg, rgba(45,48,55,1) 50%, rgba(66,71,83,0.2) 100%)',
        'topic-item-pinned':
          'linear-gradient(180deg, rgba(45,48,55,1) 50%, rgba(103,98,84,0.2) 100%)',
      },
      backgroundPosition: {
        'center-50': '50% 50%',
      },
    },
  },
  plugins: [],
}
export default config
