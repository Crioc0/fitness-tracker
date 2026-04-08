<script setup lang="ts">
  import { useSelectExercise } from '../model/useSelectExercise.ts'

  const selected = defineModel<string | string[]>()
  const { exercisesStore } = useSelectExercise()
</script>

<template>
  <div class="w-full flex">
    <el-tree-select
      v-if="!exercisesStore.isLoading"
      width="100%"
      v-model="selected"
      :data="exercisesStore.exercises"
      show-checkbox
      check-strictly
      multiple
      node-key="value"
      :props="{ disabled: (data) => !!data.children }"
      popper-class="exercise-tree-dropdown"
    />
  </div>
</template>

<style>
  .el-tree-node .el-checkbox.is-disabled {
    display: none;
  }
</style>
