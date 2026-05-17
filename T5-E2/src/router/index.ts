import { createRouter, createWebHistory } from 'vue-router';
import BuscadorLibrosLayout from '@/layouts/BuscadorLibrosLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BuscadorLibrosLayout,
    },
  ],
});

export default router;
