import type { WorkoutTemplate } from '@/entities/workout'
import type {
  WorkoutSession,
  WorkoutPhase,
  WorkPhase,
  RestPhase,
} from './session.types'

export function createWorkoutSession(
  template: WorkoutTemplate
): WorkoutSession {
  const phases: WorkoutPhase[] = []

  template.exercises.forEach((exercise, exerciseIndex) => {
    for (let set = 1; set <= exercise.sets; set++) {
      /**
       * WORK PHASE
       * duration может быть undefined
       */
      const workPhase: WorkPhase = {
        id: crypto.randomUUID(),
        type: 'work',
        exerciseId: `${exerciseIndex}`,
        exerciseTitle: exercise.title,
        setNumber: set,
        targetReps: exercise.reps,
        duration: exercise.workTimer ?? undefined,
      }

      phases.push(workPhase)

      /**
       * REST PHASE
       * добавляем только если это не последний подход
       * duration обязателен
       */
      if (set < exercise.sets || exerciseIndex < template.exercises.length - 1) {
        const restPhase: RestPhase = {
          id: crypto.randomUUID(),
          type: 'rest',
          exerciseId: `${exerciseIndex}`,
          exerciseTitle: exercise.title,
          setNumber: set,
          duration: exercise.restTimer,
        }

        phases.push(restPhase)
      }
    }
  })

  return {
    id: crypto.randomUUID(),
    templateId: undefined,
    title: template.title,
    startedAt: Date.now(),
    status: 'idle',
    currentPhaseIndex: 0,
    phases,
  }
}
