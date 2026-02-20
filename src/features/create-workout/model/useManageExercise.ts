import type { Exercise } from '@entities/exercise';
import { useFieldArray } from 'vee-validate';
import { ref } from 'vue';

export function useManageExercise() {
  const { fields, push, remove } = useFieldArray<Exercise>('exercises');
  const dialogVisible = ref(false);
  const exerciseTitle = ref('');
  const handleAddExercise = () => {
    if (!exerciseTitle.value && exerciseTitle.value.length ===0) return
    push({
      title: exerciseTitle.value,
      sets: 1,
      reps: 10,
      timer: 60,
    });
    dialogVisible.value = false;
  };

  const removeExercise = (idx: number) => {
    if (confirm('Удалить упражнение?')) remove(idx);
  };

  return {
    fields,
    dialogVisible,
    handleAddExercise,
    removeExercise,
    exerciseTitle
  };
}
