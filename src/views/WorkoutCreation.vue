<script lang="ts" setup>
import { ref } from 'vue';
import { useFieldArray, useForm } from 'vee-validate';
import CreateExerciseCard from '@/components/CreateExerciseCard/CreateExerciseCard.vue';
import AddExerciseDialog from '@/components/AddExerciseDialog/AddExerciseDialog.vue';
import type { Exercise } from '@/types/Exercise';
import { toTypedSchema } from '@vee-validate/zod'; // npm install @vee-validate/zod
import { z } from 'zod';
import BaseInput from '@/components/ui/BaseInput';
import Dumbbel from 'vue-material-design-icons/Dumbbell.vue';
import { normalizeEmptyStrings } from '@/helpers/helpers.ts';
import FormField from '@/components/ui/FormField';
import BaseNumberInput from '@/components/ui/BaseNumberInput';


// -----------------------------
  // API данные (если нужны)
  // -----------------------------
  const trainings = ref<{ id: number; title: string; reps: number }[]>([]);

  // onMounted(async () => {
  //   try {
  //     const res = await fetch('http://localhost:3000/training');
  //     trainings.value = await res.json();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  const exerciseSchema = z.object({
    title: z.string().min(1, 'Укажите название'),
    weight: z.number().min(1, 'Вес должен быть больше 0').optional(),
    reps: z.number().min(1, 'Количество повторений должно быть больше 0'),
    sets: z.number().min(1, 'Количество подходов должно быть больше 0'),
  });

  const formSchema = z.object({
    title: z
      .string()
      .min(3, 'Название должно содержать минимум 3 символа')
      .max(50, 'Название не может быть длиннее 50 символов'),
    eq: z
      .number()
      .min(1, 'Значение должно быть больше 0')
      .max(1000, 'Значение не может быть больше 1000'),
    exercises: z.array(exerciseSchema).min(1, 'Добавьте хотя бы одно упражнение'),
  });

  // Тип данных формы на основе схемы
  type FormData = z.infer<typeof formSchema>;

const { handleSubmit, errors, meta, values } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    title: '',
    exercises: [],
  },
  name: 'TrainingForm' // <--- Добавьте это
});

  const { fields, push, remove } = useFieldArray<Exercise>('exercises');

  const dialogFormVisible = ref(false);

  const handleAddExercise = (exercise: Exercise) => {
    push(exercise);
  };

  const removeExercise = (idx: number) => {
    console.log(fields);
    if (confirm('Вы уверены, что хотите удалить это упражнение?')) {
      remove(idx);
    }
    console.log(fields);
  };


  const click = () => {
    console.log(1)
  }
const onSubmit = handleSubmit((values) => {
  const res = normalizeEmptyStrings(values)
  console.log('✅ Успешная отправка! ', res);
}, (error) => {
  console.log('❌ Ошибка валидации:', error);
});
</script>

<template>
  <form class="flex flex-col gap-4 w-fit mx-auto items-center justify-between" @submit="onSubmit">
  <!--  <BaseInput name="title" size="large" >-->
  <!--    <template #prefix><Dumbbel/></template>-->
  <!--  </BaseInput>-->
  <FormField v-slot="{ field }" name="title">
    <BaseInput
      clearable
      label="Equipment"
      placeholder="Enter equipment name"
      size="large"
      v-bind="field"
    >
      <template #prefix><Dumbbel /></template>
    </BaseInput>
  </FormField>
  <FormField v-slot="{field}" name="eq">
      <BaseNumberInput size="large" label="Equipment" show-error v-bind="field" />
  </FormField>

  <div class="flex justify-between">
    <span>Упражнения</span>
    <el-button @click="dialogFormVisible = true"> Добавить упражнение </el-button>
  </div>
    <div v-for="(field, idx) in fields" :key="field.key">
      <CreateExerciseCard :exercise="field.value" :index="idx" @remove="removeExercise" />
    </div>
    <div v-if="errors.exercises" class="text-red-500 text-sm mb-3">
      {{ errors.exercises }}
    </div>

    <!-- Кнопка открытия диалога -->

    <!-- Submit -->
    <el-button @click="onSubmit" type="primary"> Сохранить тренировку </el-button>
  </form>

  <!-- Диалог -->
  <AddExerciseDialog v-model="dialogFormVisible" @add="handleAddExercise" />
</template>
