import z from 'zod';

export const FinishedWorkoutDTOSchema = z.object({
  sessionId: z.string().uuid(),
  workoutId: z.string(),
  startedAt: z.number(),
  finishedAt: z.number(),
  totalDuration: z.number(),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      exerciseTitle: z.string(),
      sets: z.array(
        z.object({
          setNumber: z.number(),
          plannedReps: z.number().optional(),
          actualReps: z.number().optional(),
          restDuration: z.number().optional(),
        })
      ),
    })
  ),
});
