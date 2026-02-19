
<script lang="ts" setup>

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
      class="w-full"
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
