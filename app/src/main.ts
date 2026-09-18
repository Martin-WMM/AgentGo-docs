import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@agentgo/ui/styles.css';
import './style.css';
import App from './App.vue';
import HomeView from './views/HomeView.vue';
import ComponentsView from './views/ComponentsView.vue';
import DocsIndexView from './views/DocsIndexView.vue';
import DocPageView from './views/DocPageView.vue';
import { i18n } from './i18n';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/components', component: ComponentsView },
    { path: '/docs', component: DocsIndexView },
    { path: '/docs/:section/:slug', component: DocPageView },
  ],
});

createApp(App).use(router).use(i18n).mount('#app');
