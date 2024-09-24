import { Suspense } from 'react';

import { Spinner } from '@nextui-org/spinner';

import { TxsList } from '^components';

export default function Txs() {
   return (
      <div>
         <Suspense
            fallback={
               <div className="grid size-full place-items-center">
                  <Spinner
                     color="primary"
                     size="lg"
                  />
               </div>
            }>
            <div className="">Transactions</div>
            <TxsList />
         </Suspense>
      </div>
   );
}
