'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

import { NextUIProvider } from '@nextui-org/system';

import { Toaster } from 'react-hot-toast';
import type { State } from 'wagmi';
import { WagmiProvider } from 'wagmi';

import { buildProvidersTree } from '^components';
import type { Children } from '^types';

import { TanstackProvider } from './tanstack-provider';

import { wagmiConfig } from '^config/wagmi';
import { SocketProvider } from '^lib/socket';

interface ProvidersProps extends Children {
   themeProps?: Omit<ThemeProviderProps, 'children'>;
   socketUrl?: string;
   initialState?: State;
}

const ProgressBar = dynamic(() => import('^components/progress-bar').then(mod => mod.default), {
   ssr: false,
});

export default function Providers({
   children,
   themeProps,
   socketUrl,
   initialState,
}: ProvidersProps) {
   const router = useRouter();

   // useNotifyOnNavigation();

   const ProviderTres = buildProvidersTree([
      [WagmiProvider, { config: wagmiConfig, initialState, children }],
      [TanstackProvider, { children }],
      [SocketProvider, { url: socketUrl, children }],
   ]);

   return (
      <ProviderTres>
         <ProgressBar />
         <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
         </NextUIProvider>
         <Toaster />
      </ProviderTres>
   );
}
