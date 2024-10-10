import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import resetStore from './stores/resetStore';

import '@/assets/main.scss';

const app = createApp(App);

app.use(router);

//pinia
const pinia = createPinia();
pinia.use(resetStore);
app.use(pinia);

//vue instance create
app.mount('#app');
