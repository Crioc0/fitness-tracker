<script setup lang="ts">
  import { computed } from 'vue'
  import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline.vue'

  const { size = 'medium', fillColor = '#f43f5e' } = defineProps<{
    size?: 'medium'
    fillColor?: string
  }>()

  defineEmits(['click'])

  const sizeClass = computed(() => {
    switch (size) {
      case 'medium': {
        return 'w-6 h-6'
      }
      default: {
        return null
      }
    }
  })
</script>

<template>
  <TrashCanOutline @click="$emit('click')" :fillColor="fillColor" :class="sizeClass" />
</template>
