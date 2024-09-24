import { nextui } from '@nextui-org/theme';

import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
   content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         fontFamily: {
            sans: ['var(--font-sans)', ...fontFamily.sans],
            mono: ['var(--font-mono)', ...fontFamily.mono],
            serif: ['var(--font-serif)', ...fontFamily.serif],
         },
         animation: {
            'appearance-row-in': 'appearance-row-in 0.5s cubic-bezier(0.550, 0.055, 0.675, 0.190)',
         },
         keyframes: {
            'appearance-row-in': {
               '0%': {
                  opacity: '0',
                  transform: 'scaleX(0.5)',
               },
               '100%': {
                  opacity: '1',
                  transform: 'scaleX(1)',
               },
            },
         },
      },
   },
   darkMode: 'class',
   plugins: [nextui()],
};

export default config;
