import z from 'zod';

export const exerciseSchema = z.object({
  title: z.string().min(1, 'Укажите название'),
  reps: z.number().min(1, 'Количество повторений должно быть больше 0'),
  sets: z.number().min(1, 'Количество подходов должно быть больше 0'),
  timer: z.number().default(60)
});

// Тип данных формы на основе схемы
export type Exercise = z.infer<typeof exerciseSchema>;
