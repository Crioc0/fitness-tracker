import type { WorkoutTemplate } from '@entities/workout';
import type { WorkoutPhase } from '@entities/workout-session';
import { createWorkoutSession } from '@entities/workout-session';
import { computed, ref, watch, onUnmounted, onMounted } from 'vue';
import { buildFinishedWorkoutDTO } from '@entities/workout-session/lib/buildFinishedWorkoutDTO.ts';
import { FinishedWorkoutDTOSchema } from '@entities/workout-session/model/finished-workout.schema.ts';
import { loadPhaseIndex, saveCompleteReps, savePhaseIndex } from './persistence';
import { useTimer } from './useTimer';


export const useRunWorkout = (workout: WorkoutTemplate) => {


  /* ------------------------------------------
   Session
------------------------------------------ */

  const workoutSession = createWorkoutSession(workout);

  const currentPhaseIndex = ref(0);

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

  const actualReps = ref<number>(0)

  const finishWorkout = () => {
    const dto = buildFinishedWorkoutDTO(workoutSession)
    FinishedWorkoutDTOSchema.parse(dto)
    console.log(dto)
  }

  async function next() {
    const phase = currentPhase.value
    if (!phase) return

    // save completed reps
    if (phase.type === 'work') {
      await saveCompleteReps(currentPhaseIndex.value, actualReps.value)

      if ('completedReps' in phase) {
        phase.completedReps = actualReps.value
      }

      actualReps.value = 0
    }

    // move forward or finish
    if (currentPhaseIndex.value < workoutSession.phases.length - 1) {
      currentPhaseIndex.value++
      await savePhaseIndex(currentPhaseIndex.value)
    } else {
      finishWorkout()
    }
  }

  function prev() {
    if (currentPhaseIndex.value > 0) {
      currentPhaseIndex.value--;
    }
  }

  /* ------------------------------------------
   Drift-free timer
------------------------------------------ */

  const {remaining,start,stop}=useTimer(next)

  /* ------------------------------------------
   React to phase changes
------------------------------------------ */

  watch(
    currentPhase,
    (phase) => {
      if (!phase) return;

      if (phase.type === 'rest') {
        start(phase.duration);
      }

      if (phase.type === 'work' && phase.duration) {
        start(phase.duration);
      }

      if (phase.type === 'work' && !phase.duration) {
        stop();
        remaining.value = 0;
      }

      if (phase.type === 'work') {
        actualReps.value = workPhase.value?.targetReps ?? 0
      }
    },
    { immediate: true }
  );


  onMounted(async () => {
    const savedIndex = await loadPhaseIndex()
    if (typeof savedIndex === 'number') {
      currentPhaseIndex.value = savedIndex
    }
  });

  onUnmounted(() => {
    stop();
  });

  return {
    workoutSession,

    currentPhaseIndex,
    currentPhase,
    workPhase,
    restPhase,

    actualReps,
    remaining,

    next,
    prev
  }
}
