import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { workoutSchema } from '@entities/workout';
import { normalizeEmptyStrings } from '@shared/lib/helpers';


export function useCreateWorkout() {
  const { handleSubmit, errors, meta,resetForm } = useForm({
    validationSchema: toTypedSchema(workoutSchema),
    initialValues: { title: '', exercises: [] }
  });



  const onSubmit = handleSubmit(async (values) => {
    const normalized = normalizeEmptyStrings(values);
    console.log('✅', normalized);
    await fetch('http://localhost:3000/workout-templates', {
      method: 'POST', // или 'PUT' если обновляете существующую запись
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalized) // преобразуем объект в JSON строку
    });

    resetForm()
  });

  return {
    resetForm,
    onSubmit,
    errors,
    meta
  };
}
