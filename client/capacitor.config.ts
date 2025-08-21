import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sphere.app',
  appName: 'Sphere',
  webDir: 'out',
  server: {
    url: 'http://192.168.0.105:3000', // Use your machine's local IP
    cleartext: true,
  },
};

export default config;
