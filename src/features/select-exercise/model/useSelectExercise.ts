import { onMounted } from 'vue';
import { useExerciseStore } from '@entities/exercise/model/exercise.store.ts';

export const useSelectExercise = () => {
  const exercisesStore = useExerciseStore();
  onMounted(async () => {
    await exercisesStore.getAllExercises();
  });

  return {
    exercisesStore,
  };
};
