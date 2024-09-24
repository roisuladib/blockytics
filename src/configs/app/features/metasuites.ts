import type { Feature } from './types';
import { getEnvValue } from '../utils';

const title = 'MetaSuites extension';

const metasuites: Feature<{ isEnabled: true }> = (() => {
   if (getEnvValue('NEXT_PUBLIC_METASUITES_ENABLED') === 'true') {
      return Object.freeze({
         title,
         isEnabled: true,
      });
   }

   return Object.freeze({
      title,
      isEnabled: false,
   });
})();

export default metasuites;
