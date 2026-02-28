<script setup lang="ts">

import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useSelectWorkout } from '@/features/select-workout/model/useSelectWorkout';
import ExerciseForm from '@/features/run-workout/ui/ExerciseForm.vue';

const { selectedWorkout } = useSelectWorkout();
const router = useRouter();

// если пользователь попал на страницу напрямую, перенаправляем на выбор
if (!selectedWorkout.value) {
  router.replace({ name: 'workouts' });
}

const workout = computed(() => {
  return (
    selectedWorkout.value || {
      title: 'Тест',
      exercises: [
        { title: '123', reps: 10, sets: 3, restTimer: 60 },
        { title: '123512', reps: 10, sets: 3, restTimer: 60 },
      ],
    }
  );
});

// на случай, если выбор поменялся после монтирования
watch(selectedWorkout, (v) => {
  if (!v) {
    router.replace({ name: 'workouts' });
  }
});

</script>

<template>
  <ExerciseForm :workout/>
</template>
