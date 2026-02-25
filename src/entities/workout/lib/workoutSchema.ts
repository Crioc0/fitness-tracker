import z from 'zod';
import { exerciseSchema } from '@entities/exercise';


export const workoutSchema = z.object({
  title: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(50, 'Название не может быть длиннее 50 символов'),
  exercises: z.array(exerciseSchema).min(1, 'Добавьте хотя бы одно упражнение'),
});

// Тип данных формы на основе схемы
export type WorkoutTemplate = z.infer<typeof workoutSchema>;


