<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import ExerciseForm from '@/features/run-workout/ui/ExerciseForm.vue';
  import { useSelectWorkout } from '@/features/select-workout/model/useSelectWorkout';

  const { selectedWorkout } = useSelectWorkout();

  const router = useRouter();

  // если пользователь попал на страницу напрямую, перенаправляем на выбор
  if (!selectedWorkout.value) {
    router.replace({ name: 'workouts' });
  }

  const workout = computed(() => {
    return selectedWorkout.value;
  });

  // на случай, если выбор поменялся после монтирования
  watch(selectedWorkout, (v) => {
    if (!v) {
      router.replace({ name: 'workouts' });
    }
  });
</script>

<template>
  <ExerciseForm v-if="workout" :workout />
  <div v-else>"Ошибка"</div>
</template>
