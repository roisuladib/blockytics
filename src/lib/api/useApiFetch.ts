import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import _omit from 'lodash/omit';
import _pickBy from 'lodash/pickBy';

import buildUrl from './buildUrl';
import { RESOURCES } from './resources';
import type { ApiResource, ResourceName, ResourcePathParams } from './resources';

import config from '^configs/app';
import type { Params as FetchParams } from '^hooks/useFetch';
import { useFetch } from '^hooks/useFetch';
import { isBodyAllowed, isNeedProxy } from '^lib/api';
import { getResourceKey } from '^lib/api/useApiQuery';
import * as cookies from '^lib/cookies';
import type { CsrfData } from '^types/client/account';

export interface ApiFetchParams<R extends ResourceName> {
   pathParams?: ResourcePathParams<R>;
   queryParams?: Record<string, string | Array<string> | number | boolean | undefined | null>;
   fetchParams?: Pick<FetchParams, 'body' | 'method' | 'signal' | 'headers'>;
}

export default function useApiFetch() {
   const fetch = useFetch();
   const queryClient = useQueryClient();
   const { token: csrfToken } = queryClient.getQueryData<CsrfData>(getResourceKey('csrf')) || {};

   return useCallback(
      <R extends ResourceName, SuccessType = unknown, ErrorType = unknown>(
         resourceName: R,
         { pathParams, queryParams, fetchParams }: ApiFetchParams<R> = {},
      ) => {
         const apiToken = cookies.get(cookies.NAMES.API_TOKEN);

         const resource: ApiResource = RESOURCES[resourceName];
         const url = buildUrl(resourceName, pathParams, queryParams);

         const withBody = isBodyAllowed(fetchParams?.method);
         const headers = _pickBy(
            {
               'x-endpoint': resource.endpoint && isNeedProxy() ? resource.endpoint : undefined,
               'Authorization': resource.endpoint && resource.needAuth ? apiToken : undefined,
               'x-csrf-token': withBody && csrfToken ? csrfToken : undefined,
               ...resource.headers,
               ...fetchParams?.headers,
            },
            Boolean,
         ) as HeadersInit;

         return fetch<SuccessType, ErrorType>(
            url,
            {
               // as of today, we use cookies only
               //    for user authentication in My account
               //    for API rate-limits (cannot use in the condition though, but we agreed with devops team that should not be an issue)
               // change condition here if something is changed
               credentials: config.features.account.isEnabled ? 'include' : 'same-origin',
               headers,
               ..._omit(fetchParams, 'headers'),
            },
            {
               resource: resource.path,
               omitSentryErrorLog: true, // disable logging of API errors to Sentry
            },
         );
      },
      [fetch, csrfToken],
   );
}
