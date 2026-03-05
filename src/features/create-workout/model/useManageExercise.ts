import { ref } from 'vue';
import { useFieldArray } from 'vee-validate';

import type { Exercise } from '@entities/exercise';

export function useManageExercise() {
  const { fields, push, remove } = useFieldArray<Exercise>('exercises');
  const dialogVisible = ref(false);
  const exerciseTitle = ref('');
  const addExercise = (exerciseTitle: string | string[]) => {
    for (const item of exerciseTitle) {
      if (!item.trim()) return;
      push({
        title: item,
        sets: 1,
        reps: 10,
        restTimer: 60,
      });
    }

    dialogVisible.value = false;
  };

  const removeExercise = (idx: number) => {
    if (confirm('Удалить упражнение?')) remove(idx);
  };

  return {
    fields,
    dialogVisible,
    addExercise,
    removeExercise,
    exerciseTitle,
  };
}
