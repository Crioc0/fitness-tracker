import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { workoutSchema } from '@entities/workout';
import { normalizeEmptyStrings } from '@shared/lib/helpers';


export function useCreateWorkout() {
  const { handleSubmit, errors, meta } = useForm({
    validationSchema: toTypedSchema(workoutSchema),
    initialValues: { title: '', exercises: [] }
  });



  const onSubmit = handleSubmit((values) => {
    const normalized = normalizeEmptyStrings(values);
    console.log('✅', normalized);
    // API вызов: createWorkout(normalized)
  });

  return {
    onSubmit,
    errors,
    meta
  };
}
