<script setup lang="ts">

import ExerciseForm from '@features/training/ui/ExerciseForm.vue';
const workout = {
  "title": "Тест",
  "exercises": [
    {
      "title": "123",
      "reps": 10,
      "sets": 3,
      "restTimer": 60
    },
    {
      "title": "123512",
      "reps": 10,
      "sets": 3,
      "restTimer": 60
    }
  ]
}

</script>

<template>
  <ExerciseForm :workout/>
</template>
