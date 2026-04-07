<script setup lang="ts">
  import { useEndWorkout } from '../model/useEndWorkout'
  import EndTrainingCard from './EndTrainingCard.vue'

  import { type WorkoutSession } from '@/entities/workout-session'

  const props = defineProps<{
    workoutSession: WorkoutSession
  }>()

  const { finishWorkout, groupedByExercise } = useEndWorkout(props.workoutSession)
</script>

<template>
  <!-- Отладка: показываем исходные данные -->
  <div class="text-xs text-gray-500 mb-2">Исходные фазы: {{ workoutSession }}</div>

  <!-- Основной контент -->
  <div
    v-if="Object.keys(groupedByExercise).length > 0"
    class="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-4 space-y-6"
  >
    <!-- Итерация по упражнениям -->
    <div
      v-for="(phases, exerciseTitle) in groupedByExercise"
      :key="exerciseTitle"
      class="space-y-3"
    >
      <EndTrainingCard :exercise-title="exerciseTitle" :phases="phases" />
    </div>
    <div class="flex gap-3">
      <button
        class="flex-1 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        @click="finishWorkout"
      >
        Закончить
      </button>
    </div>
  </div>

  <!-- Сообщение, если нет данных -->
  <div
    v-else
    class="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 text-center text-gray-400"
  >
    Нет рабочих подходов для отображения
  </div>
</template>

<style scoped>
  /* Дополнительные стили при необходимости */
</style>
