import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'is-it-my-birthday',
  webDir: 'dist',
  server: {
    cleartext: true,
  }
};

export default config;
