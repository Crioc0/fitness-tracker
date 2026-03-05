import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WorkoutTemplate } from '@entities/workout';
import { getAll, create } from '../api/workout.api.ts';

export const useWorkoutTemplatesStore = defineStore('workout-template', () => {
  const workoutTemplates = ref<WorkoutTemplate[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref('');

  const getAllWorkoutTemplates = async () => {
    isLoading.value = true;
    try {
      const { data } = await getAll();
      workoutTemplates.value = data;
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unexpected error';
    }
  };
  const createWorkoutTemplate = async (workoutTemplate: WorkoutTemplate) => {
    isLoading.value = true;
    try {
      await create(workoutTemplate);
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unexpected error';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    workoutTemplates,
    isLoading,
    errorMessage,
    getAllWorkoutTemplates,
    createWorkoutTemplate,
  };
});
