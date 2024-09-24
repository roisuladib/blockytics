import ky from 'ky';

import config from '^configs/app';

export async function TxsList() {
   const res = await ky(`${config.api.endpoint}/api/v2` + '/transactions?filter=validated');

   const txs = await res.json();

   console.log('txs', txs);

   return <div>TxsList</div>;
}
