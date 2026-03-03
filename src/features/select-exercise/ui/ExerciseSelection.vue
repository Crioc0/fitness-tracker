<script setup lang="ts">

import { useSelectExercise } from '@features/select-exercise/model/useSelectExercise.ts';

const selected = defineModel<string | string[]>()
const {exercises} = useSelectExercise()



</script>

<template>
  <div class="w-full flex">
    <el-tree-select
      width="100%"
      v-model="selected"
      :data="exercises"
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
