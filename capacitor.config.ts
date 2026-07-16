import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.carevault.ai',
  appName: 'CareVault AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
