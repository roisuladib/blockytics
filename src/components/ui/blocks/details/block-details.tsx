'use client';

import { memo } from 'react';

import { Skeleton } from '@nextui-org/skeleton';

import { useQuery } from '@tanstack/react-query';

import { shortenString } from '^utils';

import { getBlock } from '^lib/blocks/getBlock';

interface Props {
   height: string;
}

function BlockDetails({ height }: Props) {
   const { isLoading, data: block } = useQuery(getBlock({ height }));

   if (isLoading) {
      return <Skeleton className="size-96" />;
   }

   return (
      <div>
         <div className="">BlockDetails {height}</div>
         <div className="">{shortenString(block?.hash || '', 16)}</div>
      </div>
   );
}

export default memo(BlockDetails);
