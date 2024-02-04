import { CapacitorConfig } from '@capacitor/cli';

const localIp = process.env.LOCAL_IP;
if (!localIp) {
  throw new Error('LOCAL_IP environment variable is not set');
}

const config: CapacitorConfig = {
  appId: 'iimb.rossAlexandra.app',
  appName: 'Is It My Birthday',
  webDir: 'dist',
  server: {
    "url": `http://${localIp}:8080`,
    "cleartext": true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;
