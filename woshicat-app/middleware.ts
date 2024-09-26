// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const excludedPaths = ['/coming-soon'];

export default function setCSPHeader(
    request: NextRequest
) {
    // Generate a nonce for this request
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    // Modify CSP header to include the nonce
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
            process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
          };
        style-src 'self' 'unsafe-inline';
        img-src 'self' cdn.shopify.com instagram.com cdninstagram.com blob: data:;
        frame-src 'self' cdn.shopify.com blob: data:;
        media-src 'self' cdn.shopify.com data:;
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
    )

    return response
}
