import { useCallback } from 'react';

import * as Sentry from '@sentry/nextjs';

import type { ResourceError } from '^lib/api';
import { isBodyAllowed } from '^lib/api';

type Request = Pick<RequestInit, 'method' | 'headers' | 'signal' | 'credentials'>;

export interface Params extends Request {
   body?: Record<string, unknown> | FormData;
}

interface Meta {
   resource?: string;
   omitSentryErrorLog?: boolean;
}

export function useFetch() {
   return useCallback(
      <Success, Error>(
         path: string,
         params?: Params,
         meta?: Meta,
      ): Promise<Success | ResourceError<Error>> => {
         const _body = params?.body;
         const isFormData = _body instanceof FormData;
         const withBody = isBodyAllowed(params?.method);

         const body: FormData | string | undefined = (() => {
            if (!withBody) return;

            if (isFormData) return _body;

            return JSON.stringify(_body);
         })();

         const reqParams: RequestInit = {
            ...params,
            body,
            headers: {
               ...(withBody && !isFormData ? { 'Content-type': 'application/json' } : undefined),
               ...params?.headers,
            },
         };

         return fetch(path, reqParams).then(res => {
            if (!res.ok) {
               const error = {
                  status: res.status,
                  statusText: res.statusText,
               };

               if (!meta?.omitSentryErrorLog) {
                  Sentry.captureException(new Error('Client fetch failed'), {
                     tags: {
                        'source': 'fetch',
                        'source.resource': meta?.resource,
                        'status.code': error.status,
                        'status.text': error.statusText,
                     },
                  });
               }

               return res.json().then(
                  jsonError =>
                     Promise.reject({
                        payload: jsonError as Error,
                        ...error,
                     }),
                  () => Promise.reject(error),
               );
            } else {
               return res.json() as Promise<Success>;
            }
         });
      },
      [],
   );
}
