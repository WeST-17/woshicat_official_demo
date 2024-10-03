// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export default function setCSPHeader(
    request: NextRequest
) {
    // Generate a nonce for this request
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    // Modify CSP header to include the nonce
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'unsafe-inline' ${
            process.env.NODE_ENV === "production" ? `https://www.woshicat.com` : `https://localhost:3000`
          };
        style-src 'self' 'unsafe-inline';
        img-src 'self' *.shopify.com cdn.shopify.com blob: data:;
        frame-src 'self' *.shopify.com cdn.shopify.com blob: data:;
        media-src 'self' *.shopify.com cdn.shopify.com data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
    `

    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

    const requestHeaders = new Headers(request.headers)
    requestHeaders.append('x-nonce', nonce)

    requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
    )

    const response = NextResponse.next({
    request: {
        headers: requestHeaders,
    },
    })
    response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
    );

    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');

    return response
};
