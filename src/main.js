import { createApp } from 'vue';
import App from './App.vue';
import Router from './router';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import store from './store';
import loader from '@ibsheet/loader';
import 'quasar/dist/quasar.prod.css';

// Leaflet 버전 상수
const LEAFLET_VERSION = '1.9.4';
const LEAFLET_BASE = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist`;

const ibmapLib = {
  name: 'ibmap',
  baseUrl: 'https://www.ibsheet.com/v8/assets/lib/ibmap/',
  dependentUrls: [
    `${LEAFLET_BASE}/leaflet.css`,
    `${LEAFLET_BASE}/leaflet.js`,
  ],
}

loader.config({
  registry: [ibmapLib],
});

const app = createApp(App).use(Quasar, quasarUserOptions).use(store);

app.use(Router);
app.mount('#app');
