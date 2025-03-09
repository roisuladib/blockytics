import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { Spinner } from "@heroui/spinner";

const TransactionsPage = dynamic(() => import('^components/pages/transactions'), { ssr: false });

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
            <TransactionsPage />
         </Suspense>
      </div>
   );
}
