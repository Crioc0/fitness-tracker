import { onMounted, ref, toRaw } from 'vue'
import { defineStore } from 'pinia'

import { create, getAll, remove } from '../api/workout.api.ts'
import type { WorkoutTemplate } from '../lib/workoutSchema.ts'
import {
  deleteWorkoutTemplateFromIDB,
  getWorkoutTempalteFromIDB,
  saveWorkoutTemplateToIDB,
} from './persistence'

export const useWorkoutTemplatesStore = defineStore('workout-template', () => {
  const workoutTemplates = ref<WorkoutTemplate[]>([])
  const selectedWorkout = ref<WorkoutTemplate | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref<string | null>('')

  const getAllWorkoutTemplates = async () => {
    isLoading.value = true
    try {
      const { data } = await getAll()
      workoutTemplates.value = data
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unexpected error'
    }
  }
  const createWorkoutTemplate = async (
    workoutTemplate: WorkoutTemplate
  ): Promise<WorkoutTemplate> => {
    isLoading.value = true
    errorMessage.value = null
    try {
      const created = await create(workoutTemplate)
      return created
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unexpected error'
      throw error // пробрасываем, чтобы вызывающий код знал об ошибке
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

  const selectWorkout = async (value: WorkoutTemplate) => {
    selectedWorkout.value = value
    await saveWorkoutTemplateToIDB(toRaw(value))
  }

  const clearSelectedWorkout = async () => {
    selectedWorkout.value = null
    await deleteWorkoutTemplateFromIDB()
  }

  onMounted(async () => {
    const data = await getWorkoutTempalteFromIDB()
    if (data) {
      selectedWorkout.value = data
    }
  })

  return {
    workoutTemplates,
    isLoading,
    errorMessage,
    selectedWorkout,
    getAllWorkoutTemplates,
    createWorkoutTemplate,
    deleteWorkoutTemplate,
    clearSelectedWorkout,
    selectWorkout,
  }
})
