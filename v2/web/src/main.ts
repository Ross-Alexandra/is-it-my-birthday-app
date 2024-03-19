import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp, type AppState } from '@capacitor/app';

CapacitorApp.addListener('appStateChange', (state: AppState) => {
    // If the app is coming back from the background, refresh the page
    // to ensure we have the latest data.
    if (state.isActive && Capacitor.isNativePlatform()) {
        window.location.reload();
    }
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});
