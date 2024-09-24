import type { CSSProperties } from 'react';

import type { Children, ClassName } from '^types';
import { cn } from '^utils';

interface FlexProps extends Children, ClassName, CSSProperties {}

export function Flex({ children, className, ...style }: FlexProps) {
   return (
      <div
         className={cn('flex items-center gap-2', className)}
         style={style}>
         {children}
      </div>
   );
}
