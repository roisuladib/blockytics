import { Suspense } from 'react';

import { Skeleton } from '@nextui-org/skeleton';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { BlocksContent } from '^components';
import { getQueryClient } from '^lib';
import type { SearchParams } from '^types';

import { getBlocks } from '^lib/blocks/getBlocks';

export default function Blocks({ searchParams }: SearchParams<{ page: string }>) {
   const page = Number(searchParams?.page) || 1;

   const queryClient = getQueryClient();

   void queryClient.prefetchQuery(getBlocks({ itemsCount: 0, isServer: true }));
   const dehydratedState = dehydrate(queryClient);

   return (
      <HydrationBoundary state={dehydratedState}>
         <Suspense
            key={page}
            fallback={<Skeleton className="size-96 bg-danger" />}>
            <BlocksContent
               enableSocket
               type="block"
            />
         </Suspense>
      </HydrationBoundary>
   );
}
