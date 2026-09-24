import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

// Nonce-based CSP needs a proxy; until then script-src allows inline (Next's hydration scripts).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

// Applied in production only (verified with `next start`); dev stays frame-able for screenshot tooling.
const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'], qualities: [50, 65, 70, 75] },
  // Do not let `next dev` rewrite CLAUDE.md (it is hand-maintained).
  agentRules: false,
  async headers() {
    return isProd ? [{ source: '/(.*)', headers: securityHeaders }] : [];
  },
};

export default nextConfig;
