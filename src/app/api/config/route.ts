import type { NextRequest } from 'next/server';

import config from '^configs/app';

export async function GET(request: NextRequest) {
   const searchParams = request.nextUrl.searchParams;
   const query = searchParams.get('network');

   console.log('query', query);

   const publicEnvs = Object.entries(process.env)
      .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .reduce((result, [key, value]) => {
         result[key as keyof IProcessEnv] = value || '';

         return result;
      }, {} as IProcessEnv);

   return Response.json({ envs: publicEnvs, config });
}
