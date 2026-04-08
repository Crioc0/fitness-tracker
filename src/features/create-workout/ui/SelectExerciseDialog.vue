<script setup lang="ts">
  import { ref } from 'vue'

  import ExerciseSelection from '@features/select-exercise'

  import BaseDialog from '@/shared/ui/BaseDialog'

  const dialogVisible = defineModel<boolean>()
  const selectedExercise = ref<string | string[]>('')

  const emit = defineEmits<{
    (e: 'confirm', value: string | string[]): void
  }>()

  const handleConfirm = () => {
    emit('confirm', selectedExercise.value)
    dialogVisible.value = false
    selectedExercise.value = ''
  }

  const close = () => {
    dialogVisible.value = false
    selectedExercise.value = ''
  }
</script>

<template>
  <BaseDialog
    title="Добавить упражнение"
    v-model="dialogVisible"
    @confirm="handleConfirm"
    @cancel="close"
  >
    <ExerciseSelection v-model="selectedExercise" />
  </BaseDialog>
</template>
