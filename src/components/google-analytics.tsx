import Script from 'next/script';

import config from '^configs/app';

const feature = config.features.googleAnalytics;

export function GoogleAnalytics({ nonce }: { nonce: string | null }) {
   if (!feature.isEnabled) {
      return null;
   }

   const id = feature.propertyId;

   return (
      <>
         <Script
            {...(nonce && { nonce })}
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
            strategy="lazyOnload"
         />
         <Script
            id="google-analytics"
            {...(nonce && { nonce })}
            strategy="lazyOnload">
            {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', window.__envs.NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID);
            `}
         </Script>
      </>
   );
}
