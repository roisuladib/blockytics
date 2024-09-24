import fs from 'fs';
import path from 'path';

import headers from './nextjs/headers.mjs';
import rewrites from './nextjs/rewrites.mjs';

const generateEnvJsFile = () => {
   const envs = Object.fromEntries(
      Object.entries(process.env)
         .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
         .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
   );

   const jsContent = `window.__envs = ${JSON.stringify(envs, null, 3)};`;
   const outputPath = path.resolve(process.cwd(), 'public/assets/envs.js');

   fs.mkdirSync(path.dirname(outputPath), { recursive: true });
   fs.writeFileSync(outputPath, jsContent, 'utf8');
   console.log('Generated envs.js file with NEXT_PUBLIC_* environment variables.');
};

export default () => {
   // Generate the envs.js file only in development or production build
   if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
      generateEnvJsFile();
   }

   /**
    * @type {import('next').NextConfig}
    */
   const nextConfig = {
      poweredByHeader: false,
      experimental: {
         instrumentationHook: process.env.NEXT_OPEN_TELEMETRY_ENABLED === 'true',
      },
      logging: {
         fetches: {
            fullUrl: true,
         },
      },
      headers,
      rewrites,
      webpack: config => {
         // Server-specific config
         if (config.name === 'server') {
            config.optimization.concatenateModules = false;
         }

         // Resolve fallback for modules that aren't used in Next.js (fs, net, tls, etc.)
         config.resolve.fallback = { fs: false, net: false, tls: false, encoding: false };

         return config;
      },
      images: {
         dangerouslyAllowSVG: true,
         contentDispositionType: 'attachment',
         contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      },
   };

   return nextConfig;
};
