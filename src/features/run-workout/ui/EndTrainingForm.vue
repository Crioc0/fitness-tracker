<script setup lang="ts">
  import { ref, watch } from 'vue';

  import { useEndWorkout } from '../model/useEndWorkout';

  import { type WorkoutSession } from '@/entities/workout-session';
  import type { WorkPhase } from '@/entities/workout-session/model/session.types';
  import BaseNumberInput from '@/shared/ui/BaseNumberInput';

  const props = defineProps<{
    workoutSession: WorkoutSession;
  }>();

  const { finishWorkout, groupedByExercise } = useEndWorkout(props.workoutSession);



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
      <!-- Заголовок упражнения -->
      <div class="text-white font-semibold border-b border-gray-700 pb-1">
        {{ exerciseTitle }}
        <span class="text-sm text-gray-400 ml-2">
          ({{ phases.length }} {{ phases.length === 1 ? 'подход' : 'подходов' }})
        </span>
      </div>

      <!-- Список подходов -->
      <div
        v-for="(phase, index) in phases"
        :key="phase.id"
        class="bg-gray-800 rounded-lg p-3 space-y-2"
      >
        <div class="text-gray-300 text-sm mb-1">Подход {{ index + 1 }}</div>

        <div class="flex flex-col sm:flex-row gap-2">
          <BaseNumberInput
            label="Повторения"
            v-model="phase.completedReps"
            :min="0"
            :max="999"
            controls
            class="flex-1"
          />

          <BaseNumberInput
            label="Вес (кг)"
            v-model="phase.weight"
            :min="0"
            :step="0.5"
            :max="999"
            controls
            class="flex-1"
          />
        </div>
      </div>
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
