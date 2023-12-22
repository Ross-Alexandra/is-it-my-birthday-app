import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'is-it-my-birthday',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
