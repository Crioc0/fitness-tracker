<script setup lang="ts">
import type { WorkoutTemplate } from '@entities/workout'
import type { WorkoutPhase } from '@entities/workout-session'
import { createWorkoutSession } from '@entities/workout-session'
import { computed, ref, watch, onUnmounted } from 'vue'

const props = defineProps<{
  workout: WorkoutTemplate
}>()

/* ------------------------------------------
   Session
------------------------------------------ */

const workoutSession = createWorkoutSession(props.workout)

const currentPhaseIndex = ref(0)

const currentPhase = computed<WorkoutPhase | undefined>(() => {
  return workoutSession.phases[currentPhaseIndex.value]
})

const workPhase = computed(() =>
  currentPhase.value?.type === 'work'
    ? currentPhase.value
    : undefined
)

const restPhase = computed(() =>
  currentPhase.value?.type === 'rest'
    ? currentPhase.value
    : undefined
)



function next() {
  if (currentPhaseIndex.value < workoutSession.phases.length - 1) {
    currentPhaseIndex.value++
  }
}

function prev() {
  if (currentPhaseIndex.value > 0) {
    currentPhaseIndex.value--
  }
}

/* ------------------------------------------
   Drift-free timer
------------------------------------------ */

const remaining = ref(0)

let endTime = 0
let rafId: number | null = null
// let pausedAt: number | null = null

function startTimer(seconds: number) {
  stopTimer()

  const now = Date.now()
  endTime = now + seconds * 1000
  tick()
}



function tick() {
  const now = Date.now()
  const diff = endTime - now

  remaining.value = Math.max(0, Math.ceil(diff / 1000))

  if (diff <= 0) {
    stopTimer()
    next()
    return
  }

  rafId = requestAnimationFrame(tick)
}

function stopTimer() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    navigator.vibrate(200);
    rafId = null
  }
}

// function pauseTimer() {
//   if (!rafId) return
//
//   pausedAt = Date.now()
//   stopTimer()
// }
//
// function resumeTimer() {
//   if (!pausedAt) return
//
//   const pauseDuration = Date.now() - pausedAt
//   endTime += pauseDuration
//
//   pausedAt = null
//   tick()
// }

/* ------------------------------------------
   React to phase changes
------------------------------------------ */

watch(currentPhase, (phase) => {
  if (!phase) return

  if (phase.type === 'rest') {
    startTimer(phase.duration)
  }

  if (phase.type === 'work' && phase.duration) {
    startTimer(phase.duration)
  }

  if (phase.type === 'work' && !phase.duration) {
    stopTimer()
    remaining.value = 0
  }
}, { immediate: true })

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div class="max-w-[90vh] bg-gray-950 text-white flex items-center justify-center py-6">
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
          :class="workPhase
            ? 'bg-green-500/20 text-green-400'
            : 'bg-blue-500/20 text-blue-400'"
        >
          {{ currentPhase.type }}
        </div>

        <!-- Set number -->
        <p v-if="workPhase" class="text-sm text-gray-400">
          Подход {{ workPhase.setNumber }}
        </p>

        <!-- Reps -->
        <div
          v-if="workPhase"
          class="text-sm text-gray-400 mt-2"
        >
          Выполните {{ workPhase.targetReps }} повторений
        </div>

        <!-- Timer -->
        <div
          v-if=" restPhase"
          class="text-5xl font-bold tracking-widest mt-4"
        >
          {{ remaining }}с
        </div>
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
          :disabled="currentPhaseIndex >= workoutSession.phases.length - 1 || remaining > 0"
        >
          Далее
        </button>
      </div>

    </div>
  </div>
</template>
