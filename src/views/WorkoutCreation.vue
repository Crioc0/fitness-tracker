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
  import IconWrapper from '@/components/IconWrapper/IconWrapper.vue';

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
    reps: z.number().min(1, 'Количество повторений должно быть больше 0'),
    sets: z.number().min(1, 'Количество подходов должно быть больше 0'),
  });

  const formSchema = z.object({
    title: z
      .string()
      .min(3, 'Название должно содержать минимум 3 символа')
      .max(50, 'Название не может быть длиннее 50 символов'),
    exercises: z.array(exerciseSchema).min(1, 'Добавьте хотя бы одно упражнение'),
  });

  // Тип данных формы на основе схемы
  type FormData = z.infer<typeof formSchema>;

  const { handleSubmit, errors, meta } = useForm({
    validationSchema: toTypedSchema(formSchema),
    initialValues: {
      title: '',
      exercises: [],
    },
    name: 'TrainingForm', // <--- Добавьте это
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

  const onSubmit = handleSubmit((values, {resetForm})  => {
      const res = normalizeEmptyStrings(values);
      console.log('✅ Успешная отправка! ', res);
      resetForm();
    },
    (error) => {
      console.log('❌ Ошибка валидации:', error);
    }
  );
</script>

<template>
  <form class="gap-4 py-4 w-full relative bg-inherit mx-auto bg-inherit items-center justify-between" @submit="onSubmit">
    <FormField v-slot="{ field }" name="title">
      <BaseInput
        clearable
        placeholder="Название тренировки"
        size="large"
        style="width: 100%"
        v-bind="field"
      >
        <template #prefix><Dumbbel :fillColor="'var(--el-color-primary)'" /></template>
      </BaseInput>
    </FormField>

    <div class="flex justify-between items-center py-4">
      <div class="flex gap-2 items-center">
          <IconWrapper>
            <Dumbbel :size="20" :fillColor="'var(--el-color-primary)'" />
          </IconWrapper>
        <span class="text-xl">Упражнения</span>
      </div>

      <el-button type="primary" @click="dialogFormVisible = true">+ Добавить </el-button>
    </div>
    <div v-for="(field, idx) in fields" :key="field.key">
      <CreateExerciseCard :exercise="field.value" :index="idx" @remove="removeExercise" />
    </div>
    <div v-if="meta.touched && errors.exercises"
         class="text-red-500 text-sm mb-3">
      {{ errors.exercises }}
    </div>

    <!-- Кнопка открытия диалога -->

    <!-- Submit -->
    <div class="fixed bottom-0 left-0 w-full z-20 bg-inherit border-t">
      <div class="p-4">
        <el-button
          type="primary"
          native-type="submit"
          class="w-full"
        >
          Сохранить тренировку
        </el-button>
      </div>
    </div>

  </form>

  <!-- Диалог -->
  <AddExerciseDialog v-model="dialogFormVisible" @add="handleAddExercise" />
</template>
