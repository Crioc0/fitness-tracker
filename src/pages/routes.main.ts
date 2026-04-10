import RunWorkoutPage from './RunWorkoutPage.vue'
import WorkoutCreationPage from './WorkoutCreationPage.vue'
import WorkoutSelectionPage from './WorkoutSelectionPage.vue'

export const mainRoutes = [
  { path: '/', redirect: '/workouts' },
  {
    path: '/create-workout',
    name: 'create-workout',
    component: WorkoutCreationPage,
    meta: { title: 'Создание тренировок' },
  },
  {
    path: '/workouts',
    name: 'workouts',
    component: WorkoutSelectionPage,
    meta: { title: 'Выбор тренировки' },
  },
  {
    path: '/run-workout',
    name: 'run-workout',
    component: RunWorkoutPage,
    meta: { title: 'Тренировка' },
  },
]
