import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { UseQueryResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';
import { animateScroll } from 'react-scroll';

import type { PaginationParams } from '^components';
import { objectToParams } from '^utils';

import type {
   PaginatedResources,
   PaginationFilters,
   PaginationSorting,
   ResourceError,
   ResourcePayload,
} from '^lib/api/resources';
import { RESOURCES, SORTING_FIELDS } from '^lib/api/resources';
import type { ApiQueryParams } from '^lib/api/useApiQuery';
import useApiQuery from '^lib/api/useApiQuery';
import { getQueryParamString } from '^lib/router';

export interface QueryWithPagesParams<Resource extends PaginatedResources> {
   resourceName: Resource;
   options?: ApiQueryParams<Resource>['queryOptions'];
   pathParams?: ApiQueryParams<Resource>['pathParams'];
   filters?: PaginationFilters<Resource>;
   sorting?: PaginationSorting<Resource>;
   scrollRef?: React.RefObject<HTMLDivElement>;
}

type NextPageParams = Record<string, unknown>;

const INITIAL_PAGE_PARAMS = { '1': {} };

function getPaginationParamsFromQuery(queryString: string | Array<string> | undefined) {
   if (queryString) {
      try {
         return JSON.parse(decodeURIComponent(getQueryParamString(queryString))) as NextPageParams;
      } catch (error) {}
   }

   return {};
}

function getNextPageParams<R extends PaginatedResources>(data: ResourcePayload<R> | undefined) {
   if (!data || typeof data !== 'object' || !('next_page_params' in data)) {
      return;
   }

   return data.next_page_params;
}

export type QueryWithPagesResult<Resource extends PaginatedResources> = UseQueryResult<
   ResourcePayload<Resource>,
   ResourceError<unknown>
> & {
   onFilterChange: <R extends PaginatedResources = Resource>(filters: PaginationFilters<R>) => void;
   onSortingChange: (sorting?: PaginationSorting<Resource>) => void;
   pagination: PaginationParams;
};

export function useQueryWithPages<Resource extends PaginatedResources>({
   resourceName,
   filters,
   sorting,
   options,
   pathParams,
   scrollRef,
}: QueryWithPagesParams<Resource>): QueryWithPagesResult<Resource> {
   const resource = RESOURCES[resourceName];
   const queryClient = useQueryClient();
   const pathname = usePathname();
   const router = useRouter();
   const searchParams = useSearchParams();

   const query = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

   const paramsPage = searchParams.get('page') || '';
   const paramsNextPageParams = searchParams.get('next_page_params') || '';

   const [page, setPage] = useState<number>(
      paramsPage && !Array.isArray(paramsPage) ? Number(paramsPage) : 1,
   );
   const [pageParams, setPageParams] = useState<Record<number, NextPageParams>>({
      [page]: getPaginationParamsFromQuery(paramsNextPageParams),
   });
   const [hasPages, setHasPages] = useState(page > 1);

   const isMounted = useRef(false);
   const queryParams = { ...pageParams[page], ...filters, ...sorting };

   const scrollToTop = useCallback(() => {
      scrollRef?.current
         ? scrollRef.current.scrollIntoView(true)
         : animateScroll.scrollToTop({ duration: 0 });
   }, [scrollRef]);

   const queryResult = useApiQuery(resourceName, {
      pathParams,
      queryParams: Object.keys(queryParams).length ? queryParams : undefined,
      queryOptions: {
         staleTime: page === 1 ? 0 : Infinity,
         ...options,
      },
   });
   const { data } = queryResult;
   const nextPageParams = getNextPageParams(data);

   const onNextPageClick = useCallback(() => {
      if (!nextPageParams) {
         // we hide next page button if no next_page_params
         return;
      }

      setPageParams(prev => ({
         ...prev,
         [page + 1]: nextPageParams as NextPageParams,
      }));
      setPage(prev => prev + 1);

      const nextPageQuery = {
         ...query,
         page: String(page + 1),
         next_page_params: encodeURIComponent(JSON.stringify(nextPageParams)),
      };

      setHasPages(true);
      scrollToTop();
      router.push(`${pathname}?${objectToParams(nextPageQuery)}`);
   }, [nextPageParams, page, pathname, query, router, scrollToTop]);

   const onPrevPageClick = useCallback(() => {
      // returning to the first page
      // we dont have pagination params for the first page
      let nextPageQuery: Record<string, string> = query;

      if (page === 2) {
         nextPageQuery = omit(query, ['next_page_params', 'page']);
      } else {
         nextPageQuery.next_page_params = encodeURIComponent(JSON.stringify(pageParams[page - 1]));
         nextPageQuery.page = String(page - 1);
      }

      scrollToTop();
      router.push(`${pathname}?${objectToParams(nextPageQuery)}`);
      setPage(prev => prev - 1);
      page === 2 && queryClient.removeQueries({ queryKey: [resourceName] });
   }, [page, pageParams, pathname, query, queryClient, resourceName, router, scrollToTop]);

   const resetPage = useCallback(() => {
      queryClient.removeQueries({ queryKey: [resourceName] });

      scrollToTop();
      const nextRouterQuery = omit(query, ['next_page_params', 'page']);

      router.push(`${pathname}${objectToParams(nextRouterQuery)}`);
      queryClient.removeQueries({ queryKey: [resourceName] });
      setPage(1);
      setPageParams(INITIAL_PAGE_PARAMS);
      window.setTimeout(() => {
         // FIXME after router is updated we still have inactive queries for previously visited page (e.g third), where we came from
         // so have to remove it but with some delay :)
         queryClient.removeQueries({ queryKey: [resourceName], type: 'inactive' });
      }, 100);
   }, [pathname, query, queryClient, resourceName, router, scrollToTop]);

   const onFilterChange = useCallback(
      <R extends PaginatedResources = Resource>(newFilters: PaginationFilters<R> | undefined) => {
         const newQuery = omit<typeof query>(
            query,
            'next_page_params',
            'page',
            'filterFields' in resource ? resource.filterFields : [],
         );

         if (newFilters) {
            Object.entries(newFilters).forEach(([key, value]) => {
               const isValidValue = typeof value === 'boolean' || (value && value.length);

               if (isValidValue) {
                  newQuery[key] = Array.isArray(value) ? value.join(',') : String(value) || '';
               }
            });
         }
         scrollToTop();
         router.push(`${pathname}${objectToParams(newQuery)}`);
         setHasPages(false);
         setPage(1);
         setPageParams(INITIAL_PAGE_PARAMS);
      },
      [pathname, query, resource, router, scrollToTop],
   );

   const onSortingChange = useCallback(
      (newSorting: PaginationSorting<Resource> | undefined) => {
         const newQuery = objectToParams({
            ...omit<typeof query>(query, 'next_page_params', 'page', SORTING_FIELDS),
            ...newSorting,
         });

         scrollToTop();
         router.push(`${pathname}${newQuery}`);
         setHasPages(false);
         setPage(1);
         setPageParams(INITIAL_PAGE_PARAMS);
      },
      [pathname, query, router, scrollToTop],
   );

   const hasNextPage = nextPageParams ? Object.keys(nextPageParams).length > 0 : false;

   const pagination = {
      page,
      onNextPageClick,
      onPrevPageClick,
      resetPage,
      hasPages,
      hasNextPage,
      canGoBackwards: Boolean(pageParams[page - 1]),
      isLoading: queryResult.isPlaceholderData,
      isVisible: hasPages || hasNextPage,
   };

   useEffect(() => {
      if (page !== 1 && isMounted.current) {
         queryClient.cancelQueries({ queryKey: [resourceName] });
         setPage(1);
      }
      // hook should run only when queryName has changed
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resourceName]);

   useEffect(() => {
      window.setTimeout(() => {
         isMounted.current = true;
      }, 0);
   }, []);

   return { ...queryResult, pagination, onFilterChange, onSortingChange };
}
