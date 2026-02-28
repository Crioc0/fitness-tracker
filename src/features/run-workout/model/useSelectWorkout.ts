import type { WorkoutTemplate } from '@entities/workout';
import { ref } from 'vue';

// Заглушка: список тренировок, который в будущем может прийти с сервера
const _workouts: WorkoutTemplate[] = [
  {
    title: 'Утренний цикл',
    exercises: [
      { title: 'Приседания', reps: 12, sets: 3, restTimer: 60 },
      { title: 'Отжимания', reps: 10, sets: 3, restTimer: 60 },
    ],
  },
  {
    title: 'Вечерний комплекс',
    exercises: [
      { title: 'Планка', reps: 1, sets: 3, restTimer: 30 },
      { title: 'Подтягивания', reps: 8, sets: 3, restTimer: 90 },
    ],
  },
];

const workouts = ref<WorkoutTemplate[]>(_workouts);
const selectedWorkout = ref<WorkoutTemplate | null>(null);

export function useSelectWorkout() {
  function selectWorkout(w: WorkoutTemplate) {
    selectedWorkout.value = w;
  }

  // в будущем здесь можно положить асинхронный fetch
  async function loadWorkouts() {
    // имитация сетевого запроса
    await new Promise((r) => setTimeout(r, 300));
    workouts.value = _workouts;
  }

  return {
    workouts,
    selectedWorkout,
    selectWorkout,
    loadWorkouts,
  };
}
