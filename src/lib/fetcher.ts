import config from '^configs/app';

type Payload = {
   url: string;
   isServer?: boolean;
} & RequestInit;

export async function fetcher({ isServer, url, ...requestInit }: Payload) {
   const res = await fetch(`${isServer ? `${config.api.endpoint}/api/v2` : '/api'}${url}`, {
      cache: 'no-store',
      ...requestInit,
   });
   const data = await res.json();

   return data;
}
