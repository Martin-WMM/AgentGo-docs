import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@clawforge/ui/styles.css';
import './style.css';
import App from './App.vue';
import HomeView from './views/HomeView.vue';
import ComponentsView from './views/ComponentsView.vue';
import { i18n } from './i18n';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/components', component: ComponentsView },
  ],
});

createApp(App).use(router).use(i18n).mount('#app');
