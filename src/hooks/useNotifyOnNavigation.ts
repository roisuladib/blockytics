import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import config from '^configs/app';
import getQueryParamString from '^lib/router/getQueryParamString';

export function useNotifyOnNavigation() {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const tab = getQueryParamString(searchParams.toString());

   useEffect(() => {
      if (config.features.metasuites.isEnabled) {
         window.postMessage(
            { source: 'APP_ROUTER', type: 'PATHNAME_CHANGED' },
            window.location.origin,
         );
      }
   }, [pathname]);

   useEffect(() => {
      if (config.features.metasuites.isEnabled) {
         window.postMessage({ source: 'APP_ROUTER', type: 'TAB_CHANGED' }, window.location.origin);
      }
   }, [tab]);
}
