'use client';

import { getDefaultConfig } from 'connectkit';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { goerli, mainnet, sepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig(
   getDefaultConfig({
      // Your dApps chains
      chains: [mainnet, sepolia, goerli],
      storage: createStorage({
         storage: cookieStorage,
      }),
      transports: {
         // RPC URL for each chain
         [mainnet.id]: http(),
         [sepolia.id]: http(),
         [goerli.id]: http(),
         // `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      },
      multiInjectedProviderDiscovery: true,
      ssr: true,
      batch: { multicall: { wait: 100 } },

      // Required API Keys
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,

      // Required App Info
      appName: 'Your App Name',

      // Optional App Info
      appDescription: 'Your App Description',
      appUrl: 'https://family.co', // your app's url
      appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
   }),
);

declare module 'wagmi' {
   interface Register {
      config: typeof wagmiConfig;
   }
}
