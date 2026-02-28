import { idb } from '@shared/lib/idb/client.ts';

export async function savePhaseIndex(index: number) {
  await idb.set('currentPhaseIndex', index);
}

export async function loadPhaseIndex() {
  return await idb.get<number>('currentPhaseIndex');
}

export async function saveCompleteReps(index: number, reps: number) {
  const completedReps = (await idb.get<Array<Record<number, number>>>('completedReps')) || [];
  await idb.set('completedReps', [...completedReps, {[index]: reps}])
}
