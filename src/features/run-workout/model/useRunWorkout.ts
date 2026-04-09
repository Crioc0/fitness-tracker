import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useWorkoutTemplatesStore, type WorkoutTemplate } from '@entities/workout'
import type { WorkoutPhase } from '@entities/workout-session'
import { createWorkoutSession } from '@entities/workout-session'
import { buildFinishedWorkoutDTO } from '@entities/workout-session'
import { useWorkoutSessionStore } from '@entities/workout-session'

import { clear, loadPhaseIndex, saveCompleteReps, savePhaseIndex } from './persistence'
import { useTimer } from './useTimer'

export const useRunWorkout = (workout: WorkoutTemplate) => {
  /* ------------------------------------------
   Session
------------------------------------------ */
  const workoutSession = createWorkoutSession(workout)
  const router = useRouter()
  const workoutSessionStore = useWorkoutSessionStore()

  const currentPhaseIndex = ref(0)

  const currentPhase = computed<WorkoutPhase | undefined>(() => {
    return workoutSession.phases[currentPhaseIndex.value]
  })

  const workPhase = computed(() =>
    currentPhase.value?.type === 'work' ? currentPhase.value : undefined
  )

  const restPhase = computed(() =>
    currentPhase.value?.type === 'rest' ? currentPhase.value : undefined
  )

  const restBetweenExercisesPhase = computed(() =>
    currentPhase.value?.type === 'restBetweenExercises' ? currentPhase.value : undefined
  )

  const actualReps = ref<number>(0)

  const finishWorkout = async () => {
    const dto = buildFinishedWorkoutDTO(workoutSession)
    await workoutSessionStore.finishWorkoutSession(dto)
  }

  async function next() {
    const phase = currentPhase.value
    if (!phase) return

    // save completed reps
    if (phase.type === 'work') {
      await saveCompleteReps(currentPhase.value.exerciseTitle!, actualReps.value)

      if ('completedReps' in phase) {
        phase.completedReps = actualReps.value
        console.log(workoutSession)
      }

      actualReps.value = 0
    }

    // move forward or finish
    if (currentPhaseIndex.value < workoutSession.phases.length) {
      currentPhaseIndex.value++
      await savePhaseIndex(currentPhaseIndex.value)
    } else {
      finishWorkout()
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

  const { remaining, start, stop } = useTimer(next)

  async function cancelTraining() {
    await clear()
    useWorkoutTemplatesStore().clearSelectedWorkout()
    router.push({ name: 'workouts' })
  }

  /* ------------------------------------------
   React to phase changes
------------------------------------------ */

  watch(
    currentPhase,
    (phase) => {
      if (!phase) return

      if (phase.type === 'rest' || phase.type === 'restBetweenExercises') {
        start(phase.duration)
      }

      if (phase.type === 'work' && phase.duration) {
        start(phase.duration)
      }

      if (phase.type === 'work' && !phase.duration) {
        stop()
        remaining.value = 0
      }

      if (phase.type === 'work') {
        actualReps.value = workPhase.value?.targetReps ?? 0
      }
    },
    { immediate: true }
  )

  onMounted(async () => {
    const savedIndex = await loadPhaseIndex()
    if (typeof savedIndex === 'number') {
      currentPhaseIndex.value = savedIndex
    }
  })

  onUnmounted(() => {
    stop()
  })

  return {
    workoutSession,

    currentPhaseIndex,
    currentPhase,
    workPhase,
    restPhase,
    restBetweenExercisesPhase,

    actualReps,
    remaining,

    next,
    prev,
    buildFinishedWorkoutDTO,
    cancelTraining,
  }
}
