import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { workoutSchema, type WorkoutTemplate } from '@entities/workout';
import { normalizeEmptyStrings } from '@shared/lib/helpers';
import { useWorkoutTemplatesStore } from '@entities/workout';

export function useCreateWorkout() {
  const { handleSubmit, errors, meta, resetForm } = useForm({
    validationSchema: toTypedSchema(workoutSchema),
    initialValues: { title: '', exercises: [] },
  });

  const workoutTemplateStore = useWorkoutTemplatesStore();

  const onSubmit = handleSubmit(async (values) => {
    const normalized = normalizeEmptyStrings<WorkoutTemplate>(values);
    await workoutTemplateStore.createWorkoutTemplate(normalized);
    resetForm();
  });

  return {
    resetForm,
    onSubmit,
    errors,
    meta,
  };
}
