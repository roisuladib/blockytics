import { memo } from 'react';

import { Progress } from '@nextui-org/progress';
import { Skeleton } from '@nextui-org/skeleton';

import _ from 'lodash';

import type { ClassName, IsLoading } from '^types';
import { cn } from '^utils';

import { Flex } from './flex';

interface Props extends ClassName, IsLoading {
   value: number;
   colorScheme?: 'success' | 'default';
}

const WIDTH = 50;

function Utilization({ value, className, isLoading, colorScheme }: Props) {
   const valueString = _.clamp(value * 100 || 0, 0, 100).toLocaleString(undefined, {
      maximumFractionDigits: 2,
   });
   const textColor = colorScheme === 'default' ? cn('text-default-500') : cn('text-success');

   return (
      <Flex className={className}>
         <Skeleton
            className="rounded-full"
            isLoaded={!isLoading}
            style={{ width: `${WIDTH}px` }}>
            <Progress
               aria-label="Loading..."
               classNames={{ indicator: cn('rounded-none') }}
               color={colorScheme}
               size="sm"
               value={+valueString}
            />
         </Skeleton>
         <Skeleton
            className={cn('rounded-lg font-bold', textColor)}
            isLoaded={!isLoading}>
            {valueString}%
         </Skeleton>
      </Flex>
   );
}

export default memo(Utilization);
