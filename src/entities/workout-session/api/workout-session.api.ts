import { httpClient } from '@shared/lib/api/http.ts';
import {
  type FinishedWorkoutDTO,
  FinishedWorkoutDTOSchema,
} from '@entities/workout-session';

export const create = async (dto: FinishedWorkoutDTO) => {
  FinishedWorkoutDTOSchema.parse(dto);
  return await httpClient.post('/workout-sessions', dto);
};
