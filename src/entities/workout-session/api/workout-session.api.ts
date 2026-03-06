import { httpClient } from '@shared/lib/api/http.ts';

import {
  type FinishedWorkoutDTO,
  FinishedWorkoutDTOSchema,
} from '../model/finished-workout.schema';

export const create = async (dto: FinishedWorkoutDTO) => {
  console.log(FinishedWorkoutDTOSchema.parse(dto));

  return await httpClient.post('/workout-sessions', dto);
};
