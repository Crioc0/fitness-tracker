import { idb } from '@shared/lib/idb/client.ts'

export async function savePhaseIndex(index: number) {
  await idb.set('currentPhaseIndex', index)
}

export async function loadPhaseIndex() {
  return await idb.get<number>('currentPhaseIndex')
}
export async function loadCompletedReps(): Promise<CompletedRepsStore | undefined> {
  return await idb.get<CompletedRepsStore>('completedReps')
}
interface CompletedRepsStore {
  [key: string]: number[] // Сигнатура индекса - ключ string, значение number[]
}

export async function saveCompleteReps(title: string, actualReps: number) {
  const allReps = (await loadCompletedReps()) || {}

  // Получаем массив подходов для конкретного упражнения или создаем новый
  const exerciseReps = allReps[title] ? [...allReps[title]] : []

  // Добавляем новое значение
  exerciseReps.push(actualReps)

  // Обновляем объект
  allReps[title] = exerciseReps

  // Сохраняем весь объект целиком
  await idb.set('completedReps', allReps)
}

export async function clear() {
  await idb.del('currentPhaseIndex')
  await idb.del('completedReps')
}
