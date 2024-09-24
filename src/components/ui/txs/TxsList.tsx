import ky from 'ky';

export async function TxsList() {
   const res = await ky(process.env.NEXT_PUBLIC_API_URL + '/transactions?filter=validated');

   const txs = await res.json();

   console.log('txs', txs);

   return <div>TxsList</div>;
}
