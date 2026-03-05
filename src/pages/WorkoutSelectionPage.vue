<script setup lang="ts">
  import WorkoutList from '@/features/select-workout/ui/WorkoutList.vue';
  import { onMounted } from 'vue';
  import { useWorkoutTemplatesStore } from '@entities/workout/model/workout.store.ts';
  const { getAllWorkoutTemplates } = useWorkoutTemplatesStore();
  onMounted(async () => {
    await getAllWorkoutTemplates();
  });
</script>

<template>
  <WorkoutList />
</template>
