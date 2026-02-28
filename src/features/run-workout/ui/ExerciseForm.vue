<script setup lang="ts">
  import type { WorkoutTemplate } from '@entities/workout';
  import BaseNumberInput from '@/components/ui/BaseNumberInput';
import { useRunWorkout } from '../model/useRunWorkout';



  const props = defineProps<{
    workout: WorkoutTemplate;
  }>();

  const {
    workoutSession,
    currentPhaseIndex,
    currentPhase,
    workPhase,
    restPhase,
    actualReps,
    remaining,
    next,
    prev
  } = useRunWorkout(props.workout)

</script>

<template>
  <div class=" bg-gray-950 text-white flex items-center justify-center py-6">
    <div class="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-4 space-y-6">
      <!-- Header -->
      <div class="text-center space-y-1">
        <h2 class="text-2xl font-semibold tracking-wide">
          {{ workout.title }}
        </h2>

        <p class="text-sm text-gray-400">
          Фаза {{ currentPhaseIndex + 1 }} из {{ workoutSession.phases.length }}
        </p>
      </div>

      <!-- Phase Card -->
      <div
        v-if="currentPhase"
        class="bg-gray-800 min-h-[clamp(200px,25vh,350px)] rounded-2xl p-6 text-center space-y-4"
      >
        <h3 class="text-lg font-medium text-gray-300">
          {{ currentPhase.exerciseTitle }}
        </h3>

        <!-- Type badge -->
        <div
          class="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
          :class="workPhase ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'"
        >
          {{ currentPhase.type }}
        </div>

        <!-- Set number -->
        <p v-if="workPhase" class="text-sm text-gray-400">Подход {{ workPhase.setNumber }}</p>

        <!-- Reps -->
        <div v-if="workPhase">
          <div  class="text-sm text-gray-400 mt-2">
            Выполните {{ workPhase.targetReps }} повторений
          </div>
            <BaseNumberInput v-model="actualReps" :min="1" :max="workPhase.targetReps + 5" controls />

        </div>




        <!-- Timer -->
        <div v-if="restPhase" class="text-5xl font-bold tracking-widest mt-4">{{ remaining }}с</div>
      </div>

      <!-- Navigation -->
      <div class="flex gap-3">
        <button
          v-if="!restPhase"
          class="flex-1 bg-gray-700 hover:bg-gray-600 transition rounded-xl py-3 font-medium"
          @click="prev"
          :disabled="currentPhaseIndex === 0"
        >
          Назад
        </button>

        <button
          class="flex-1 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          @click="next"
          :disabled=" remaining > 0"
        >
          Далее
        </button>
      </div>
    </div>
  </div>
</template>
