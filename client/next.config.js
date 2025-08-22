/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.gstatic.com",
              "connect-src 'self' https://classroom.googleapis.com https://accounts.google.com https://oauth2.googleapis.com https://content-classroom.googleapis.com",
              "frame-src 'self' https://accounts.google.com https://content-classroom.googleapis.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;