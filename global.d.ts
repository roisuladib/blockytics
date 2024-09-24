import type { WalletProvider } from '^types/web3';

type CPreferences = {
   zone: string;
   width: string;
   height: string;
};

declare global {
   export interface Window {
      ethereum?: WalletProvider;
      coinzilla_display: Array<CPreferences>;
      ga?: {
         getAll: () => Array<{ get: (prop: string) => string }>;
      };
      AdButler: {
         ads: Array<unknown>;
         register: (...args: unknown) => void;
      };
      abkw: string;
      __envs: NodeJS.ProcessEnv;
   }

   export interface IProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_WS_URL: string;
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;

      NEXT_PUBLIC_APP_INSTANCE: string;
      NEXT_PUBLIC_RE_CAPTCHA_APP_SITE_KEY: string;
      NEXT_PUBLIC_APP_PORT: string;
      NEXT_PUBLIC_APP_PROTOCOL: string;
      NEXT_PUBLIC_APP_HOST: string;
      NEXT_PUBLIC_APP_ENV: string;
      NEXT_PUBLIC_USE_NEXT_JS_PROXY: string;
      NEXT_PUBLIC_API_HOST: string;
      NEXT_PUBLIC_API_PROTOCOL: string;
      NEXT_PUBLIC_API_PORT: string;
      NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL: string;
      NEXT_PUBLIC_API_BASE_PATH: string;
      NEXT_PUBLIC_PROMOTE_BLOCKSCOUT_IN_TITLE: string;
      NEXT_PUBLIC_OG_DESCRIPTION: string;
      NEXT_PUBLIC_OG_IMAGE_URL: string;
      NEXT_PUBLIC_OG_ENHANCED_DATA_ENABLED: string;
      NEXT_PUBLIC_SEO_ENHANCED_DATA_ENABLED: string;
      NEXT_PUBLIC_ROLLUP_TYPE: string;
      NEXT_PUBLIC_NETWORK_VERIFICATION_TYPE: string;
      NEXT_PUBLIC_NETWORK_ID: string;
      NEXT_PUBLIC_NETWORK_NAME: string;
      NEXT_PUBLIC_NETWORK_SHORT_NAME: string;
      NEXT_PUBLIC_NETWORK_CURRENCY_NAME: string;
      NEXT_PUBLIC_NETWORK_CURRENCY_WEI_NAME: string;
      NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL: string;
      NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS: string;
      NEXT_PUBLIC_NETWORK_SECONDARY_COIN_SYMBOL: string;
      NEXT_PUBLIC_NETWORK_MULTIPLE_GAS_CURRENCIES: string;
      NEXT_PUBLIC_NETWORK_TOKEN_STANDARD_NAME: string;
      NEXT_PUBLIC_NETWORK_RPC_URL: string;
      NEXT_PUBLIC_IS_TESTNET: string;
      NEXT_PUBLIC_VIEWS_NFT_MARKETPLACES: string;
      NEXT_PUBLIC_METASUITES_ENABLED: string;
   }

   namespace NodeJS {
      interface ProcessEnv extends IProcessEnv {}
   }
}

export {};
