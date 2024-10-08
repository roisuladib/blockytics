import type { ArrayElement } from '../utils';

export const ROLLUP_TYPES = ['optimistic', 'arbitrum', 'shibarium', 'zkEvm', 'zkSync'] as const;

export type RollupType = ArrayElement<typeof ROLLUP_TYPES>;
