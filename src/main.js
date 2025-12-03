import { createApp } from 'vue';
import App from './App.vue';
import Router from './router';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import store from './store';
import loader from '@ibsheet/loader';
import 'quasar/dist/quasar.prod.css';

loader.config({
  registry: [
    {
      name: 'ibmap',
      baseUrl: 'https://www.ibsheet.com/v8/assets/lib/ibmap/',
      dependentUrls: [
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
      ],
    }
  ]
});

const app = createApp(App).use(Quasar, quasarUserOptions).use(store);

app.use(Router);
app.mount('#app');
