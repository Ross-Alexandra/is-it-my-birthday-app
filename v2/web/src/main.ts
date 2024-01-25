import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

const pinia = createPinia();
const app = createApp(App);
app.use(IonicVue);
app.use(pinia);
app.use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});
