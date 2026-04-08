import type { WorkoutTemplate } from '@entities/workout'

import { httpClient } from '@shared/lib/api/http.ts'

export const create = async (data: WorkoutTemplate) => {
  return await httpClient.post('/workout-templates', data)
}
