import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

import type { Block } from '^types/api/block';

type Options = {
   height: string;
   isServer?: boolean;
};

export function getBlock({ height, isServer }: Options) {
   return queryOptions<Block>({
      queryKey: ['block', height],
      queryFn: () => fetcher({ url: `/blocks/${height}`, isServer }),
   });
}
