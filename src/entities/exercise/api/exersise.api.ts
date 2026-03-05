import { httpClient } from '@shared/lib/api/http.ts';

export const getAll = async () => {
  return await httpClient.get('/exercises');
};
