<script lang="ts" setup>
  const model = defineModel();
  export type MyInputNumberProps = { name: string; label: string };
 const props = defineProps<{
    label: string;
    controls?: boolean;
    error?: string;
    showError?: boolean;
  }>();

</script>

<template>
  <div class="flex flex-col  items-center justify-between">
    <span>{{ label }}</span>
    <el-input-number v-model="model" :controls class="my-input-number" :class="{ 'is-error': error }" />
        <small v-if="error && showError" class="error-message">
          {{ error }}
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


   .is-error>:deep(.el-input) {
    --el-input-border-color: #f56c6c;
  }

  .error-message {
    color: #f56c6c;
    font-size: 12px;
    margin-top: 4px;
  }
</style>
