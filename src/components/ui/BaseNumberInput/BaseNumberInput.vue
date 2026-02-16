<script lang="ts" setup>
  import type { InputNumberProps } from 'element-plus';
  import { useField } from 'vee-validate';

  export type MyInputNumberProps = { name: string, label: string } & Omit<InputNumberProps, 'modelValue'>;

  const props = withDefaults(defineProps<MyInputNumberProps>(), {
    controls: false,
  });

  const { value, errorMessage } = useField<number | null>(
    () => props.name,
    undefined, // ← это rules
    {
      initialValue: null,
    }
  );
</script>

<template>
  <div class="flex flex-col h-full items-center justify-between">
    <span>{{ label }}</span>
    <el-input-number v-model="value" class="my-input-number" v-bind="props" />
    <small v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
  .el-input-number {
    width: 72px;
  }
  :deep(.el-input) {
    --el-input-inner-height: 32px;
  }



  .is-error :deep(.el-input__wrapper) {
    border-color: #f56c6c;
  }

  .error-message {
    color: #f56c6c;
    font-size: 12px;
    margin-top: 4px;
  }
</style>
