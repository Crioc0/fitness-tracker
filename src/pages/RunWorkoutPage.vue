<script setup lang="ts">
  import { toRef, watch } from 'vue'
  import { useRouter } from 'vue-router'

  import { useWorkoutTemplatesStore } from '@/entities/workout'
  import ExerciseForm from '@/features/run-workout/ui/ExerciseForm.vue'

  const router = useRouter()
  const workoutTemplateStore = useWorkoutTemplatesStore()

  const selectedWorkout = toRef(workoutTemplateStore.selectedWorkout)
  // если пользователь попал на страницу напрямую, перенаправляем на выбор
  if (!selectedWorkout.value) {
    router.replace({ name: 'workouts' })
  }

  // на случай, если выбор поменялся после монтирования
  watch(selectedWorkout, (v) => {
    if (!v) {
      router.replace({ name: 'workouts' })
    }
  })
</script>

<template>
  <ExerciseForm v-if="selectedWorkout" :workout="selectedWorkout" />
  <div v-else>"Ошибка"</div>
</template>
