<script setup lang="ts" generic="T = any">
import { useField } from 'vee-validate'
import { computed } from 'vue';

const props = defineProps<{
  name: string
}>()

const { value, errorMessage, handleChange, handleBlur, meta } = useField<T>(
  () => props.name,
  undefined,
  {
    validateOnMount: false,
    syncVModel: true
  }
)

const fieldProps = computed(() => ({
  modelValue: value.value,
  'onUpdate:modelValue': (val: T) => handleChange(val, true),
  onBlur: handleBlur,
  error: errorMessage.value,
  meta: meta
}))
</script>

<template>
  <div>
    <slot
      :field="fieldProps"
      :meta="meta"
      :error="errorMessage"
    />

  </div>
</template>
