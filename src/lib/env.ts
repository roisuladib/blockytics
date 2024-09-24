import dotenv from 'dotenv';
import path from 'path';

export const PRESETS = {
   arbitrum: 'https://arbitrum.blockscout.com',
   base: 'https://base.blockscout.com',
   celo_alfajores: 'https://celo-alfajores.blockscout.com',
   eth: 'https://eth.blockscout.com',
   eth_goerli: 'https://eth-goerli.blockscout.com',
   eth_sepolia: 'https://eth-sepolia.blockscout.com',
   gnosis: 'https://gnosis.blockscout.com',
   optimism: 'https://optimism.blockscout.com',
   optimism_celestia: 'https://opcelestia-raspberry.gelatoscout.com',
   optimism_sepolia: 'https://optimism-sepolia.blockscout.com',
   polygon: 'https://polygon.blockscout.com',
   rootstock_testnet: 'https://rootstock-testnet.blockscout.com',
   stability_testnet: 'https://stability-testnet.blockscout.com',
   zkevm: 'https://zkevm.blockscout.com',
   zksync: 'https://zksync.blockscout.com',
   // main === staging
   main: 'https://eth-sepolia.k8s-dev.blockscout.com',
} as const;

type Network = keyof typeof PRESETS;

export function loadEnv(network: Network) {
   for (const key in process.env) {
      delete process.env[key];
   }

   dotenv.config({ path: '.env.local' });

   const envFile = path.resolve(process.cwd(), `src/configs/envs/.env.${network}`);

   dotenv.config({ path: envFile, override: true });
}
