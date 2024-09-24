'use client';

import { memo } from 'react';

import { Skeleton } from '@nextui-org/skeleton';

import { Tooltip } from '^components';
import { useTimeAgoIncrement, useWindowSize } from '^hooks';
import { dayjs } from '^lib';

type Props = {
   timestamp?: string | number | null;
   fallbackText?: string;
   isLoading?: boolean;
   enableIncrement?: boolean;
   className?: string;
};

function TimeAgoWithTooltip({
   timestamp,
   fallbackText,
   isLoading,
   enableIncrement,
   className,
}: Props) {
   const timeAgo = useTimeAgoIncrement(timestamp || '', enableIncrement && !isLoading);
   const { width } = useWindowSize();

   if (!timestamp && !fallbackText) return null;

   const content = timestamp ? (
      <Tooltip
         content={dayjs(timestamp).format('llll')}
         isDisabled={isLoading}
         placement={width > 1000 ? 'bottom' : 'right'}>
         <span>{timeAgo}</span>
      </Tooltip>
   ) : (
      <span>{fallbackText}</span>
   );

   return (
      <Skeleton
         className={className}
         isLoaded={!isLoading}>
         {content}
      </Skeleton>
   );
}

export default memo(TimeAgoWithTooltip);
