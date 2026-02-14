<script setup lang="ts">
  import type { InputNumberProps } from 'element-plus'
  const model = defineModel<number>()
  export type MyInputNumberProps ={label:string, error?: string} & Omit<InputNumberProps, 'modelValue'>

  const props = withDefaults(defineProps<MyInputNumberProps>(), {
    controls: true,

  })
</script>

<template>
  <div class="flex flex-col w-fit items-center justify-between">
    <span>{{label}}</span>
    <el-input-number :class="{ 'is-error': error }"  class="my-input-number"  v-model="model" v-bind="props" />
    <small v-if="error" class="error-message">{{ error }}</small>
  </div>

</template>

<style scoped>

  .is-error :deep(.el-input__wrapper) {
    border-color: #f56c6c;
  }
  .error-message {
    color: #f56c6c;
    font-size: 12px;
    margin-top: 4px;
  }

</style>
