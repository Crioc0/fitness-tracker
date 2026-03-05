import { httpClient } from '@shared/lib/api/http.ts';
import type { WorkoutTemplate } from '@entities/workout';

export const getAll = async () => {
  return await httpClient.get('/workout-templates');
};

export const create = async (data: WorkoutTemplate) => {
  return await httpClient.post('/workout-templates', data);
};
