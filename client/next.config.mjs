/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://apis.google.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https:;
              connect-src 'self' https://fantasticfour.onrender.com https://classroom.googleapis.com https://accounts.google.com https://oauth2.googleapis.com https://content-classroom.googleapis.com;
              frame-src https://accounts.google.com;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig;