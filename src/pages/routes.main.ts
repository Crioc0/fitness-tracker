import WorkoutCreationPage from '@pages/WorkoutCreationPage.vue';
import TrainingPage from "@pages/TrainingPage.vue";

export const mainRoutes = [
  {
    path: '/',
    name: 'home',
    component: WorkoutCreationPage,
    meta: { title: 'Создание тренировок' }
  },
  {
    path: '/training',
    name: 'training',
    component: TrainingPage,
    meta: { title: 'Тренировка' }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
]
