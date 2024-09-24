import BigNumber from 'bignumber.js';

import { WEI, ZERO } from '../consts';

import type { Block } from '^types/api/block';

export function getBlockTotalReward(block: Block) {
   const totalReward =
      block.rewards
         ?.map(({ reward }) => BigNumber(reward))
         .reduce((result, item) => result.plus(item), ZERO) || ZERO;

   return totalReward.div(WEI);
}
