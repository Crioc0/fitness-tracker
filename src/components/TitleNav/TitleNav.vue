<script lang="ts" setup>
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div class="py-6  border-b">
    <h2 class="text-xl  text-center">
      {{ title }}
    </h2>
  </div>

</template>
