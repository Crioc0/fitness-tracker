import { defineStore } from 'pinia';
import { create } from '../api/workout-session.api.ts';
import { ref } from 'vue';
import type { FinishedWorkoutDTO } from '@entities/workout-session/model/finished-workout.schema.ts';

export const useWorkoutSessionStore = defineStore('workout-session', ()=>{
  const isLoading = ref(false)
  const errorMessage = ref('')
  const finishWorkoutSession =async (dto: FinishedWorkoutDTO)=> {
    isLoading.value = true
    try {
      await create(dto);
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unexpected error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    errorMessage,
    finishWorkoutSession
  }
})
