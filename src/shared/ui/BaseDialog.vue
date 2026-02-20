<script lang="ts" setup >
import { ref } from 'vue';

defineProps<{
  title: string
}>()


defineEmits(['confirm', 'cancel'])

const close = () => {
  model.value = false;
};

const model = ref<boolean>(true);

</script>

<template>
  <el-dialog v-model="model" class="exercise-dialog " :title :width="'clamp(380px, 90vw, 510px)'"  >
    <slot/>
    <div class="mt-4 flex justify-end gap-2">
      <el-button @click="close">Отмена</el-button>
      <el-button type="primary" @click.prevent="$emit('confirm')"> Добавить </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
.exercise-dialog {
  --el-dialog-bg-color: black;
  --el-text-color-primary: white;
  border: 1px solid white;
}
</style>
