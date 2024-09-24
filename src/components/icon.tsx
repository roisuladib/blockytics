import type { IconProps } from '@iconify/react';
import { Icon as Iconify } from '@iconify/react';

import { cn } from '^utils';

export function Icon({ icon, className, ...props }: IconProps) {
   return (
      <Iconify
         className={cn('text-default-500 group-data-[selected=true]:text-foreground', className)}
         height={20}
         icon={`solar:${icon}`}
         width={20}
         {...props}>
         Icon
      </Iconify>
   );
}
