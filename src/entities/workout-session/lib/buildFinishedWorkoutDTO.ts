import type { WorkoutSession } from '@entities/workout-session';

export function buildFinishedWorkoutDTO(session: WorkoutSession) {
  const exercisesMap = new Map();

  session.phases.forEach((phase) => {
    if (!exercisesMap.has(phase.exerciseId)) {
      exercisesMap.set(phase.exerciseId, {
        exerciseId: phase.exerciseId,
        exerciseTitle: phase.exerciseTitle,
        sets: [],
      });
    }

    const exercise = exercisesMap.get(phase.exerciseId);

    if (phase.type === 'work') {
      exercise.sets.push({
        setNumber: phase.setNumber,
        plannedReps: phase.targetReps,
        actualReps: phase.completedReps ?? phase.targetReps,
      });
    }

    if (phase.type === 'rest') {
      const lastSet = exercise.sets.at(-1);
      if (lastSet) {
        lastSet.restDuration = phase.duration;
      }
    }
  });

  return {
    sessionId: session.id,
    workoutId: session.workoutId,
    startedAt: session.startedAt,
    finishedAt: Date.now(),
    totalDuration: Date.now() - session.startedAt,
    exercises: Array.from(exercisesMap.values()),
  };
}
