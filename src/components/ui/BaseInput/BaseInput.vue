<!-- BaseInput.vue - с defineModel -->
<script lang="ts" setup>
// defineModel создаст modelValue и onUpdate:modelValue
const model = defineModel<string>({
  required: true
});

const props = defineProps<{
  label?: string;
  size?: 'large' | 'default' | 'small';
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
}>();

</script>

<template>
  <div class="relative">
    <label v-if="label">{{ label }}</label>
    <el-input
      v-model="model"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :readonly="readonly"
      :autofocus="autofocus"
    >
      <template #prefix>
        <slot name="prefix" />
      </template>
    </el-input>
  </div>
</template>
