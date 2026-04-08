<script setup lang="ts">
  import { onMounted } from 'vue'

  import { useWorkoutTemplatesStore } from '@entities/workout'

  import WorkoutList from '@/features/select-workout/ui/WorkoutList.vue'
  const { getAllWorkoutTemplates } = useWorkoutTemplatesStore()
  onMounted(async () => {
    await getAllWorkoutTemplates()
  })
</script>

<template>
  <WorkoutList />
</template>
