import { Suspense } from 'react';

import Link from 'next/link';

import { Button } from '@nextui-org/button';
import { Skeleton } from '@nextui-org/skeleton';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Flex, Icon } from '^components';
import { getQueryClient } from '^lib';
import type { Params } from '^types';
import { cn } from '^utils';

import { title } from '^components/primitives';
import BlockDetails from '^components/ui/blocks/details/block-details';
import { getBlock } from '^lib/blocks/getBlock';

export default async function BlockDetailsPage({ params: { height } }: Params<{ height: string }>) {
   const queryClient = getQueryClient();

   await queryClient.prefetchQuery(getBlock({ height, isServer: true }));

   const dehydratedState = dehydrate(queryClient);

   return (
      <div>
         <HydrationBoundary state={dehydratedState}>
            <Flex className="gap-3">
               <Button
                  isIconOnly
                  as={Link}
                  href="/blocks"
                  size="sm">
                  <Icon
                     className="size-6"
                     icon="arrow-left-outline"
                  />
               </Button>
               <h1 className={cn(title({ size: 'xs' }), 'font-mono')}>Block #{height}</h1>
            </Flex>
            <Suspense
               key={height}
               fallback={<Skeleton className="size-96" />}>
               <BlockDetails height={height} />
            </Suspense>
         </HydrationBoundary>
      </div>
   );
}
