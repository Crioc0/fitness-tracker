import { onMounted } from 'vue'

import { useExerciseStore } from '@entities/exercise'

export const useSelectExercise = () => {
  const exercisesStore = useExerciseStore()
  onMounted(async () => {
    await exercisesStore.getAllExercises()
  })

  return {
    exercisesStore,
  }
}
