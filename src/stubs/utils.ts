import type { PaginatedResources, PaginatedResponse, PaginatedResponseItems } from '^lib/api';
import type { ArrayElement } from '^types/utils';

export function generateListStub<Resource extends PaginatedResources>(
   stub: ArrayElement<PaginatedResponseItems<Resource>>,
   num = 50,
   rest: Omit<PaginatedResponse<Resource>, 'items'>,
) {
   return {
      items: Array(num).fill(stub),
      ...rest,
   };
}
