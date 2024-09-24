import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import type { DataPagination } from '^types';

import { fetcher } from '../fetcher';

import type { Block } from '^types/api/block';

type Options = {
   itemsCount: number;
   isServer?: boolean;
};

export function getBlocks({ itemsCount, isServer }: Options) {
   return queryOptions<DataPagination<Block>>({
      queryKey: ['blocks', itemsCount],
      queryFn: () => fetcher({ url: '/blocks?type=block', isServer }),
      placeholderData: keepPreviousData,
   });
}
