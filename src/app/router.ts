import { createRouter, createWebHistory } from 'vue-router'
import { mainRoutes } from '@pages/routes.main.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: mainRoutes
})

export default router
