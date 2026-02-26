<script lang="ts" setup>
  const model = defineModel();
  export type MyInputNumberProps = { name: string; label: string };
 const props = defineProps<{
    label?: string;
    controls?: boolean;
    error?: string;
    showError?: boolean;
    min?: number;
    max?: number;
  }>();

</script>

<template>
  <div class="flex flex-col items-center justify-between">
    <span>{{ label }}</span>
    <el-input-number
      v-model="model"
      :controls="controls"
      :min
      :max
      class="my-input-number"
      :class="{
        'is-error': error,
        'without-controls': !controls
      }"
    />
    <small v-if="error && showError" class="error-message">
      {{ error }}
    </small>
  </div>
</template>

<style scoped>
:deep(.el-input) {
  --el-input-inner-height: 32px;
}



/* Можно задать другую ширину для режима без controls */
.without-controls {
  width: 72px; /* или любая другая ширина */
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
