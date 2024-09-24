'use client';

import React from 'react';

import { useTheme } from 'next-themes';

import { ConnectKitProvider } from 'connectkit';

export function withConnectKit(WrappedComponent: React.ComponentType) {
   const ConnectKitEnhanced = () => {
      const { theme } = useTheme();

      return (
         <ConnectKitProvider mode={theme === 'dark' ? 'dark' : 'light'}>
            <WrappedComponent />
         </ConnectKitProvider>
      );
   };

   ConnectKitEnhanced.displayName = `withConnectKit(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

   return ConnectKitEnhanced;
}
