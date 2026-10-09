import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@agentgo/ui/styles.css';
import './style.css';
import App from './App.vue';
import HomeView from './views/HomeView.vue';
import { i18n } from './i18n';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    {
      path: '/components',
      component: () => import('./views/ComponentsView.vue'),
    },
    {
      path: '/docs',
      component: () => import('./views/DocsIndexView.vue'),
    },
    {
      path: '/docs/:section/:slug',
      component: () => import('./views/DocPageView.vue'),
    },
  ],
});

createApp(App).use(router).use(i18n).mount('#app');
