import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { Skeleton } from "@heroui/skeleton";

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '^lib';
import type { SearchParams } from '^types';

import { getBlocks } from '^lib/blocks/getBlocks';

const BlocksPage = dynamic(() => import('^components/pages/blocks'), { ssr: false });

export default function Blocks({ searchParams }: SearchParams<{ page: string }>) {
   const page = Number(searchParams?.page) || 1;

   const queryClient = getQueryClient();

   void queryClient.prefetchQuery(getBlocks({ itemsCount: 0, isServer: true }));
   const dehydratedState = dehydrate(queryClient);

   return (
      <HydrationBoundary state={dehydratedState}>
         <Suspense
            key={page}
            fallback={<Skeleton className="size-96" />}>
            <BlocksPage
               enableSocket
               type="block"
            />
         </Suspense>
      </HydrationBoundary>
   );
}
