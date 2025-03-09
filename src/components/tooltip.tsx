import { memo } from 'react';

import type { TooltipProps } from "@heroui/tooltip";
import { Tooltip as NextTooltip } from "@heroui/tooltip";

interface Props extends Pick<TooltipProps, 'isDisabled' | 'content' | 'placement' | 'children'> {}

function Tooltip({ content, isDisabled, placement, children }: Props) {
   return (
      <NextTooltip
         showArrow
         closeDelay={0}
         color="foreground"
         content={isDisabled ? undefined : content}
         isDisabled={isDisabled}
         placement={placement || 'bottom'}
         radius="sm"
         size="sm">
         {children}
      </NextTooltip>
   );
}

export default memo(Tooltip);
