import { httpClient } from '@shared/lib/api/http.ts';
import type { WorkoutTemplate } from '../lib/workoutSchema';


export const getAll = async () => {
  return await httpClient.get('/workout-templates');
};

export const create = async (data: WorkoutTemplate) => {
  return await httpClient.post('/workout-templates', data);
};
