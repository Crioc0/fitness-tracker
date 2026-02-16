<script lang="ts" setup>
  import type { InputNumberProps } from 'element-plus';
  import { useField } from 'vee-validate';

  export type MyInputNumberProps = { label: string; name: string } & Omit<
    InputNumberProps,
    'modelValue'
  >;

  const props = withDefaults(defineProps<MyInputNumberProps>(), {
    controls: true,
  });

  const { value, errorMessage } = useField<number | null>(
    () => props.name,
  );
</script>

<template>
  {{value}}
  <div class="flex flex-col w-fit items-center justify-between">
    <span>{{ label }}</span>
    <el-input-number
      v-model="value"
      class="my-input-number"
      v-bind="props"
    />
    <small v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </small>
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
