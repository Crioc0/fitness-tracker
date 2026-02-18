<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Exercise } from '@/types/Exercise';

  // v-model
  const model = defineModel<boolean>();

  const emit = defineEmits<{
    (e: 'add', exercise: Exercise): void;
  }>();

  const title = ref<string>('');

  const close = () => {
    model.value = false;
  };

  const addExercise = () => {
    if (!title.value.trim()) return;

    emit('add', {
      title: title.value,
      reps: 0,
      weight: 0,
      sets: 0,
      max: 0,
      timer: 60,
    });

    title.value = '';
    close();
  };
</script>

<template>
  <el-dialog v-model="model" class="exercise-dialog" title="Добавить упражнение" width="95%">
    <el-input v-model="title" />

    <div class="mt-4 flex justify-end gap-2">
      <el-button @click="close">Отмена</el-button>
      <el-button type="primary" @click="addExercise"> Добавить </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
  .exercise-dialog {
    --el-dialog-bg-color: black;
    --el-text-color-primary: white;
    border: 1px solid white;
  }
</style>
