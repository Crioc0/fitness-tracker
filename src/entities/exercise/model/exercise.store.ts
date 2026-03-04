import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Exercise } from '@entities/exercise';
import { getAll } from '@entities/exercise/api/exersise.api.ts';

export const useExerciseStore = defineStore('exercise', () => {
  const exercises = ref<Exercise[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  const getAllExercises = async () => {
    isLoading.value = true;
    try {
      const { data } = await getAll();
      exercises.value = data;
    } catch (error: unknown) {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unexpected error'
    } finally {
      isLoading.value = false;
    }
  };

  return {
    getAllExercises,
    exercises,
    isLoading,
    errorMessage
  };
});
