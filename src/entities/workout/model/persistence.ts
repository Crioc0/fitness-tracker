import { idb } from '@shared/lib/idb/client.ts'

import type { WorkoutTemplate } from '../lib/workoutSchema'

export async function saveWorkoutTemplateToIDB(workoutTempalte: WorkoutTemplate) {
  await idb.set('workoutTemplate', workoutTempalte)
}

export async function getWorkoutTempalteFromIDB() {
  return await idb.get<WorkoutTemplate>('workoutTemplate')
}

export async function deleteWorkoutTemplateFromIDB() {
  await idb.del('workoutTemplate')
}
