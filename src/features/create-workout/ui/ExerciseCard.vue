<script setup lang="ts">
import TrashCanOutline from "vue-material-design-icons/TrashCanOutline.vue";
import TimerSand from "vue-material-design-icons/TimerSand.vue";
import LightningBolt from "vue-material-design-icons/LightningBolt.vue";

import BaseNumberInput from '@/components/ui/BaseNumberInput';
import { useField } from 'vee-validate';
import { computed } from 'vue';
import FormField from '@/components/ui/FormField/FormField.vue';
import { useManageExercise } from '@features/create-workout/model/useManageExercise.ts';
import type { Exercise } from '@entities/exercise';

const props = defineProps<{
  exercise: Exercise;
  index: number;
}>();

const {removeExercise} = useManageExercise()

const titlePath = computed(() => `exercises[${props.index}].title`);
const { value: title } = useField<string>(titlePath);
</script>

<template>
  <div class=" w-full p-4 ">
    <div class="header w-full  flex items-center justify-between mb-4">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-blue-400/20 rounded-full flex justify-center items-center mr-3"><LightningBolt :fillColor="'var(--el-color-primary)'" /></div>
        <div class=" flex-wrap justify-around items-center">
          <h2 class="text-lg">{{title}}</h2>
          <h3 class="text-xs">НАСТРОЙКА ПАРАМЕТРОВ</h3>
        </div>
      </div>
      <button @click="removeExercise(index)">
        <TrashCanOutline :fillColor="'#f43f5e'" class="w-5 h-5" />
      </button>
    </div>
    <div class="flex justify-center gap-4">
      <FormField :name="`exercises[${index}].sets`" v-slot="{ field }">
        <BaseNumberInput v-bind="field" controls size="large" :min="1" label="Сеты"/>
      </FormField>
      <FormField :name="`exercises[${index}].reps`" v-slot="{ field }">
        <BaseNumberInput v-bind=field controls size="large" :min="1" label="Повторы" />
      </FormField>



    </div>
    <el-divider />
    <div class="flex justify-between">
      <div class="flex gap-2">
        <TimerSand />
        <span>Отдых : {{exercise.restTimer}}</span>
      </div>
      <span>Изменить таймер</span>
    </div>
  </div>

</template>
