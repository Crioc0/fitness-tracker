<script setup lang="ts">

  const { size = 8 } = defineProps<{
    size?: 6 | 8 | 10 | 12;
  }>();

  const sizeMap: Record<number, string> = {
    6: 'h-6 w-6',
    8: 'h-8 w-8',
    10: 'h-10 w-10',
    12: 'h-12 w-12',
  };

  const iconSizeClass = sizeMap[size] ?? 'h-8 w-8';
</script>

<template>
  <div :class="['rounded-xl flex items-center justify-center bg-blue-400/20', iconSizeClass]">
    <slot />
  </div>
</template>
