import type { WorkoutTemplate } from '@entities/workout';
import { ref } from 'vue';
import {  useWorkoutTemplatesStore } from '@entities/workout/model/workout.store.ts';

const selectedWorkout = ref<WorkoutTemplate | null>(null);

export function useSelectWorkout() {
  const workoutTemplatesStore = useWorkoutTemplatesStore()
  function selectWorkout(w: WorkoutTemplate) {
    selectedWorkout.value = w;
  }

  return {
    workoutTemplatesStore,
    selectedWorkout,
    selectWorkout,
  };
}
