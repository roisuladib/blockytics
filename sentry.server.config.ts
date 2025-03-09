// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
   dsn: 'https://9e77f00a97d0257170dee6d883ec5a74@o1076959.ingest.us.sentry.io/4508016584949760',

   // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
   tracesSampleRate: 1,

   // Setting this option to true will print useful information to the console while you're setting up Sentry.
   debug: false,
});
