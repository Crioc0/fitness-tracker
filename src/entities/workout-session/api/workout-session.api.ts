import { httpClient } from '@shared/lib/api/http.ts';
import { FinishedWorkoutDTOSchema, type FinishedWorkoutDTO } from '../model/finished-workout.schema';


export const create = async (dto: FinishedWorkoutDTO) => {
  FinishedWorkoutDTOSchema.parse(dto);
  return await httpClient.post('/workout-sessions', dto);
};
