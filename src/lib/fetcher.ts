type Payload = {
   url: string;
   isServer?: boolean;
} & RequestInit;

export async function fetcher({ isServer, url, ...requestInit }: Payload) {
   const res = await fetch(`${isServer ? process.env.NEXT_PUBLIC_API_URL : '/api'}${url}`, {
      cache: 'no-store',
      ...requestInit,
   });
   const data = await res.json();

   return data;
}
