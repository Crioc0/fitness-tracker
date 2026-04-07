import { v4 as uuidv4 } from 'uuid'

import type {
  RestBetweenExercises,
  RestPhase,
  WorkoutPhase,
  WorkoutSession,
  WorkPhase,
} from './session.types'

import type { WorkoutTemplate } from '@/entities/workout'

export function createWorkoutSession(template: WorkoutTemplate): WorkoutSession {
  const phases: WorkoutPhase[] = []

  template.exercises.forEach((exercise, exerciseIndex) => {
    const isLastExercise = exerciseIndex === template.exercises.length - 1

    for (let set = 1; set <= exercise.sets; set++) {
      const isLastSet = set === exercise.sets

      // WORK PHASE
      const workPhase: WorkPhase = {
        id: uuidv4(),
        type: 'work',
        exerciseId: `${exerciseIndex}`,
        exerciseTitle: exercise.title,
        weight: exercise.weight,
        setNumber: set,
        targetReps: exercise.reps,
        completedReps: 0,
        duration: exercise.workTimer ?? undefined,
      }
      phases.push(workPhase)

      // Отдых между подходами (RestPhase)
      if (!isLastSet) {
        const restPhase: RestPhase = {
          id: uuidv4(),
          type: 'rest',
          exerciseId: `${exerciseIndex}`,
          exerciseTitle: exercise.title,
          setNumber: set,
          duration: exercise.restTimer ?? 1, // используем restTimer из упражнения
        }
        phases.push(restPhase)
      }

      // Отдых между упражнениями (RestBetweenExercises)
      // Добавляем только после последнего подхода текущего упражнения
      // и только если это не последнее упражнение
      if (isLastSet && !isLastExercise) {
        const restBetweenExercises: RestBetweenExercises = {
          id: uuidv4(),
          type: 'restBetweenExercises',
          exerciseId: `${exerciseIndex}`,
          exerciseTitle: exercise.title,
          setNumber: set,
          duration: exercise.restBetweenExercises ?? 2, // используем из шаблона
        }
        phases.push(restBetweenExercises)
      }
    }
  })

  return {
    id: uuidv4(),
    workoutId: uuidv4(),
    templateId: undefined,
    title: template.title,
    startedAt: Date.now(),
    status: 'idle',
    currentPhaseIndex: 0,
    phases,
  }
}
