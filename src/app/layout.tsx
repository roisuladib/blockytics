import '^styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';

import { Link } from '@nextui-org/link';

import clsx from 'clsx';
import { cookieToInitialState } from 'wagmi';

import type { Children } from '^types';

import Providers from './providers';

import { Navbar } from '^components/navbar';
import { fontMono, fontSans, fontSerif } from '^config/fonts';
import { siteConfig } from '^config/site';
import { wagmiConfig } from '^config/wagmi';
import config from '^configs/app';

export const metadata: Metadata = {
   title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
   },
   description: siteConfig.description,
   icons: {
      icon: '/favicon.ico',
   },
};

export const viewport: Viewport = {
   themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
   ],
};

export default function RootLayout({ children }: Readonly<Children>) {
   const initialState = cookieToInitialState(wagmiConfig, headers().get('cookie'));

   return (
      <html
         suppressHydrationWarning
         lang="en">
         <head>
            <Script src="/assets/envs.js" />
         </head>
         <body
            className={clsx(
               'min-h-screen bg-background font-sans antialiased',
               fontSans.variable,
               fontMono.variable,
               fontSerif.variable,
            )}>
            <Providers
               initialState={initialState}
               socketUrl={`${config.api.socket}${config.api.basePath}/socket/v2`}
               themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
               <div className="relative flex h-screen flex-col">
                  <Navbar />
                  <main className="container mx-auto max-w-7xl flex-grow px-10 pt-16">
                     {children}
                  </main>
                  <footer className="flex w-full items-center justify-center py-3">
                     <Link
                        isExternal
                        className="flex items-center gap-1 text-current"
                        href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                        title="nextui.org homepage">
                        <span className="text-default-600">Powered by</span>
                        <p className="text-primary">NextUI</p>
                     </Link>
                  </footer>
               </div>
            </Providers>
         </body>
      </html>
   );
}
