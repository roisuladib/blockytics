import { memo } from 'react';

import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';

import BigNumber from 'bignumber.js';

import { Tooltip, Utilization } from '^components';
import type { ClassName, IsLoading } from '^types';

interface Props extends ClassName, IsLoading {
   gasUsed?: string;
   gasLimit?: string;
   gasTarget?: number;
}

function BlockGasUsed({ className, gasUsed, gasLimit, gasTarget, isLoading }: Props) {
   const hasGasUtilization = gasUsed && gasUsed !== '0';

   if (!hasGasUtilization) return null;

   return (
      <>
         <Tooltip
            content="Gas Used %"
            isDisabled={isLoading}>
            <div>
               <Utilization
                  className={className}
                  colorScheme="default"
                  isLoading={isLoading}
                  value={BigNumber(gasUsed).dividedBy(BigNumber(gasLimit!)).toNumber()}
               />
            </div>
         </Tooltip>
         {gasTarget && (
            <>
               <Divider
                  className="h-4"
                  orientation="vertical"
               />
               <Tooltip
                  content="% of Gas Target"
                  isDisabled={isLoading}>
                  <Skeleton
                     className="rounded-lg text-default-500"
                     isLoaded={!isLoading}>
                     {`${gasTarget > 0 ? '+' : ''}${gasTarget.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}
                  </Skeleton>
               </Tooltip>
            </>
         )}
      </>
   );
}

export default memo(BlockGasUsed);
