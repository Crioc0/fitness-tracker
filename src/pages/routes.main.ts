import WorkoutCreationPage from '@pages/WorkoutCreationPage.vue';
import WorkoutSelectionPage from '@pages/WorkoutSelectionPage.vue';
import RunWorkoutPage from './RunWorkoutPage.vue';

export const mainRoutes = [
  {
    path: '/',
    name: 'home',
    component: WorkoutCreationPage,
    meta: { title: 'Создание тренировок' }
  },
  {
    path: '/workouts',
    name: 'workouts',
    component: WorkoutSelectionPage,
    meta: { title: 'Выбор тренировки' }
  },
  {
    path: '/run-workout',
    name: 'run-workout',
    component: RunWorkoutPage,
    meta: { title: 'Тренировка' }
  },
]
