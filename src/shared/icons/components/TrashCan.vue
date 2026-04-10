<script setup lang="ts">
  import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline.vue'

  const { size = 24, fillColor = '#f43f5e' } = defineProps<{
    size?: 24 | 48
    fillColor?: string
  }>()

  defineEmits(['click'])
</script>

<template>
  <TrashCanOutline @click="$emit('click')" :fillColor="fillColor" :size />
</template>
