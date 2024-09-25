import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
   const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
   const cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
      style-src 'self' 'nonce-${nonce}';
      img-src 'self' blob: data:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
   `;

   const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();
   const requestHeaders = new Headers(req.headers);

   requestHeaders.set('x-nonce', nonce);
   requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

   const res = NextResponse.next({ request: { headers: requestHeaders } });

   res.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

   return res;
}
