'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

import { getQueryClient } from '^lib';
import type { Children } from '^types';

export function TanstackProvider({ children }: Children) {
   // NOTE: Avoid useState when initializing the query client if you don't
   //       have a suspense boundary between this and the code that may
   //       suspend because React will throw away the client on the initial
   //       render if it suspends and there is no boundary
   const queryClient = getQueryClient();

   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
         <ReactQueryDevtools />
      </QueryClientProvider>
   );
}
