import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.worknest.app',
  appName: 'NEXUS',
  webDir: 'out',
  server: {
    // Load the live Vercel deployment — no static export needed
    url: 'https://work-nest-2-worknest-2.vercel.app',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#ffffff',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#818CF8',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#818CF8',
    },
  },
};

export default config;
