import { ref } from 'vue'
import { defineStore } from 'pinia'

import { create, getAll, remove } from '../api/workout.api.ts'
import type { WorkoutTemplate } from '../lib/workoutSchema.ts'

export const useWorkoutTemplatesStore = defineStore('workout-template', () => {
  const workoutTemplates = ref<WorkoutTemplate[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const getAllWorkoutTemplates = async () => {
    isLoading.value = true
    try {
      const { data } = await getAll()
      workoutTemplates.value = data
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unexpected error'
    }
  }
  const createWorkoutTemplate = async (workoutTemplate: WorkoutTemplate) => {
    isLoading.value = true
    try {
      await create(workoutTemplate)
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unexpected error'
    } finally {
      isLoading.value = false
    }
  }

  const deleteWorkoutTemplate = async (id: string) => {
    isLoading.value = true
    try {
      await remove(id)
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unexpected error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    workoutTemplates,
    isLoading,
    errorMessage,
    getAllWorkoutTemplates,
    createWorkoutTemplate,
    deleteWorkoutTemplate,
  }
})
