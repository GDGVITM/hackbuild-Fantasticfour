import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sphere.app',
  appName: 'Sphere',
  webDir: 'out',
  server: {
    url: 'https://fantasticfour.onrender.com', // Use your machine's local IP
    cleartext: true,
  },
};

export default config;
