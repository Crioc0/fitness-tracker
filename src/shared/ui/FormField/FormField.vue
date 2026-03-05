<script setup lang="ts" generic="T = any">
  import { computed } from 'vue';
  import { useField } from 'vee-validate';

  const props = defineProps<{
    name: string;
  }>();

  const { value, errorMessage, handleChange, handleBlur, meta } = useField<T>(
    () => props.name,
    undefined,
    {
      validateOnMount: false,
      syncVModel: true,
    }
  );

  const fieldProps = computed(() => ({
    modelValue: value.value,
    'onUpdate:modelValue': (val: T) => handleChange(val, true),
    onBlur: handleBlur,
    error: errorMessage.value,
    meta: meta,
  }));
</script>

<template>
  <slot :field="fieldProps" :meta="meta" :error="errorMessage" />
</template>
