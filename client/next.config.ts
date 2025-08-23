import type { NextConfig } from "next";

const csp = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.gstatic.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://*.googleapis.com; connect-src 'self' blob: https://translate.googleapis.com https://translate-pa.googleapis.com https://*.googleapis.com https://fantasticfour.onrender.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://www.gstatic.com; img-src 'self' data: blob: https: *.google.com *.gstatic.com;";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Add headers so the browser will allow loading the Google Translate script and assets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;