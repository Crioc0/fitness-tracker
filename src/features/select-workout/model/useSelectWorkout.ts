import { ref } from 'vue'

import type { WorkoutTemplate } from '@entities/workout'
import { useWorkoutTemplatesStore } from '@entities/workout'

const selectedWorkout = ref<WorkoutTemplate | null>(null)

export function useSelectWorkout() {
  const workoutTemplatesStore = useWorkoutTemplatesStore()
  function selectWorkout(w: WorkoutTemplate) {
    workoutTemplatesStore.selectedWorkout = w
  }

  async function deleteWorkoutTemplate(id: string) {
    await workoutTemplatesStore.deleteWorkoutTemplate(id)
    if (!workoutTemplatesStore.errorMessage) {
      await workoutTemplatesStore.getAllWorkoutTemplates()
    } else {
      console.error(workoutTemplatesStore.errorMessage)
    }
  }

  return {
    workoutTemplatesStore,
    selectedWorkout,
    selectWorkout,
    deleteWorkoutTemplate,
  }
}
