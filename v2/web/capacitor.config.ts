import { CapacitorConfig } from '@capacitor/cli';

const localIp = process.env.LOCAL_IP;
if (!localIp) {
  throw new Error('LOCAL_IP environment variable is not set');
}

const devOptions = process.env.NODE_ENV === 'development'
    ? {
        server: {
            "url": `http://${localIp}:8080`,
            "cleartext": true,
        }
    }
    : {};

const config: CapacitorConfig = {
  appId: 'com.isitmybirthday',
  appName: 'Is It My Birthday',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  },
  ...devOptions,
};

export default config;
