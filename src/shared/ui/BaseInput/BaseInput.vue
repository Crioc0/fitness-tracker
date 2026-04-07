<script lang="ts" setup>
  const model = defineModel<string>({
    required: true,
  })

  defineProps<{
    label?: string
    size?: 'large' | 'default' | 'small'
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    readonly?: boolean
    autofocus?: boolean
    error?: string
  }>()
</script>

<template>
  <div class="relative pb-3">
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
      :class="{ 'is-error': error }"
    >
      <template #prefix>
        <slot name="prefix" />
      </template>
    </el-input>
    <span v-if="error" class="text-red-500 absolute left-0 -bottom-2 text-xs mt-1 block">
      {{ error }}
    </span>
  </div>
</template>
