<script setup lang="ts">
  import { ref } from 'vue'

  import type { WorkPhase } from '@/entities/workout-session/model/session.types'
  import BaseNumberInput from '@/shared/ui/BaseNumberInput'
  defineProps<{
    exerciseTitle: string
    phases: WorkPhase[]
  }>()

  const isHidden = ref(true)
</script>

<template>
  <!-- Заголовок упражнения -->
  <div class="text-white font-semibold border-b border-gray-700 pb-1" @click="isHidden = !isHidden">
    {{ exerciseTitle }}
    <span class="text-sm text-gray-400 ml-2">
      ({{ phases.length }}
      {{ phases.length === 1 ? 'подход' : phases.length < 5 ? 'подхода' : 'подходов' }})
    </span>
  </div>

  <!-- Список подходов -->
  <div
    :class="[isHidden && 'hidden']"
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
</template>
