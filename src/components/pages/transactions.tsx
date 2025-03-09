'use client';

import { useSearchParams } from 'next/navigation';

import { Spinner } from "@heroui/spinner";

import { useQueryWithPages } from '^hooks';
import { generateListStub, TX } from '^stubs';
import { shortenString } from '^utils';

import { getQueryParamString } from '^lib/router';

export default function Transactions() {
   const searchParams = useSearchParams();
   const params = searchParams.get('tab') || '';
   const tab = getQueryParamString(params);

   const txsValidatedQuery = useQueryWithPages({
      resourceName: 'txs_validated',
      filters: { filter: 'validated' },
      options: {
         enabled: !tab || tab === 'validated',
         placeholderData: generateListStub<'txs_validated'>(TX, 50, {
            next_page_params: {
               block_number: 9005713,
               index: 5,
               items_count: 50,
               filter: 'validated',
            },
         }),
      },
   });

   return (
      <div className="">
         {txsValidatedQuery.isPending ? (
            <Spinner />
         ) : (
            txsValidatedQuery.data?.items.map((e, i) => <div key={i}>{shortenString(e.hash)}</div>)
         )}
      </div>
   );
}
