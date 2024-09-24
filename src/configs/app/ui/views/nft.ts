import { getEnvValue, parseEnvJson } from '^configs/app/utils';
import type { NftMarketplaceItem } from '^types/views/nft';

const nft = Object.freeze({
   marketplaces:
      parseEnvJson<Array<NftMarketplaceItem>>(getEnvValue('NEXT_PUBLIC_VIEWS_NFT_MARKETPLACES')) ||
      [],
});

export default nft;
