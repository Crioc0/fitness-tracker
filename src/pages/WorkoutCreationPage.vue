<script lang="ts" setup>
  import { RouterLink } from 'vue-router';
  import CreateWorkoutForm from '@features/create-workout/ui/CreateWorkoutForm.vue';
</script>

<template>
  <div class="space-y-8">
    <CreateWorkoutForm />
    <div class="text-center">
      <RouterLink
        :to="{ name: 'workouts' }"
        class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition"
      >
        Перейти к тренировкам
      </RouterLink>
    </div>
  </div>
</template>
