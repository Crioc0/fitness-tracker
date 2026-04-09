import { httpClient } from '@shared/lib/api/http.ts'

import type { WorkoutTemplate } from '../lib/workoutSchema'

export const getAll = async () => {
  return await httpClient.get('/workout-templates')
}

export const create = async (data: WorkoutTemplate) => {
  const response = await httpClient.post('/workout-templates', data)
  return response.data
}

export const remove = async (id: string) => {
  return await httpClient.delete(`/workout-templates/${id}`)
}
