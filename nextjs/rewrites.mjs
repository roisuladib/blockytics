const apiSchema = process.env.NEXT_PUBLIC_API_PROTOCOL || 'https';
const apiHost = process.env.NEXT_PUBLIC_API_HOST;
const apiPort = process.env.NEXT_PUBLIC_API_PORT;
const apiEndpoint = [apiSchema, '://', apiHost, apiPort && ':' + apiPort].filter(Boolean).join('');

export default async function rewrites() {
   return [
      {
         source: '/node-api/proxy/:path*',
         destination: `${apiEndpoint}/:path*`,
      },
   ];
}
