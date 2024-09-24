import type { ClassValue } from 'tailwind-variants';
import { cn as _cn } from 'tailwind-variants';

const COMMON_UNITS = ['small', 'medium', 'large'];

export function cn(...inputs: ClassValue[]) {
   return _cn(inputs)({
      twMerge: true,
      twMergeConfig: {
         extend: {
            theme: {
               opacity: ['disabled'],
               spacing: ['divider'],
               borderWidth: COMMON_UNITS,
               borderRadius: COMMON_UNITS,
            },
         },
         classGroups: {
            'shadow': [{ shadow: COMMON_UNITS }],
            'font-size': [{ text: ['tiny', ...COMMON_UNITS] }],
            // 'bg-image': ['bg-stripe-gradient'],
         },
      },
   });
}
