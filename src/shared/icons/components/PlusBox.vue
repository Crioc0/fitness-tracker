<script lang="ts" setup>
  import PlusBox from 'vue-material-design-icons/PlusBox.vue'

  const { size = 24, fillColor = '#57b0ff' } = defineProps<{
    size?: 24 | 48
    fillColor?: string
  }>()
</script>

<template>
  <PlusBox @click="$emit('click')" :fillColor="fillColor" :size="size" />
</template>
