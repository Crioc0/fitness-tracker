<script setup lang="ts">
import Delete from "vue-material-design-icons/Delete.vue";
import TimerSand from "vue-material-design-icons/TimerSand.vue";
import type { Exercise } from '@/types/Exercise.ts';
import BaseNumberInput from '@/components/ui/BaseNumberInput';
import { useField } from 'vee-validate';
import { computed } from 'vue';

const props = defineProps<{
  exercise: Exercise;
  index: number;
}>();

const emit = defineEmits<{
  (e: 'remove', index: number): void
}>()

const deleteExercise = () =>{
  emit('remove', props.index)
  console.log('delete')
}

const titlePath = computed(() => `exercises[${props.index}].title`);
const { value: title } = useField<string>(titlePath);
</script>

<template>
  <div class=" w-full p-4 ">
    <div class="header w-full   flex items-center justify-between mb-4">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-blue-800 rounded-full mr-3"></div>
        <div class=" flex-wrap justify-around items-center">
          <h2><el-input v-model="title"></el-input></h2>
          <h3 class="text-xs">НАСТРОЙКА ПАРАМЕТРОВ</h3>
        </div>
      </div>
      <button @click="deleteExercise">
        <Delete class="w-5 h-5" />
      </button>
    </div>
    <div class="flex gap-4">
      <BaseNumberInput :name="`exercises[${index}].sets`" label="Сеты"/>
      <BaseNumberInput :name="`exercises[${index}].reps`" label="Повторы" />
      <BaseNumberInput :name="`exercises[${index}].weight`" label="Вес (КГ)"/>
      <BaseNumberInput :name="`exercises[${index}].time`" label="Время"/>
    </div>
    <el-divider />
    <div class="flex justify-between">
      <div class="flex gap-2">
        <TimerSand />
        <span>Отдых : {{exercise.timer}}</span>
      </div>
      <span>Изменить таймер</span>

    </div>
  </div>

</template>
