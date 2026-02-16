<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useFieldArray, useForm } from 'vee-validate';
  import CreateExerciseCard from '@/components/CreateExerciseCard/CreateExerciseCard.vue';
  import AddExerciseDialog from '@/components/AddExerciseDialog/AddExerciseDialog.vue';
  import type { Exercise } from '@/types/Exercise';

  // -----------------------------
  // API данные (если нужны)
  // -----------------------------
  const trainings = ref<{ id: number; title: string; reps: number }[]>([]);

  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:3000/training');
      trainings.value = await res.json();
    } catch (error) {
      console.error(error);
    }
  });

  const { handleSubmit } = useForm({
    initialValues: {
      exercises: [] as Exercise[],
    },
  });

  const { fields, push, remove } = useFieldArray<Exercise>('exercises');

  const dialogFormVisible = ref(false);

  const handleAddExercise = (exercise: Exercise) => {
    push(exercise);
  };

  const onSubmit = handleSubmit((values) => {
    console.log('Form submitted:', values);

    // TODO: отправка на API
  });
</script>

<template>
  <div class="flex justify-between">
    <span>Упражнения</span>
    <el-button @click="dialogFormVisible = true"> Добавить упражнение </el-button>

  </div>
  <form class="flex flex-col gap-4 w-fit items-center justify-between" @submit="onSubmit">
    <div v-for="(field, idx) in fields" :key="field.key">
      <CreateExerciseCard :exercise="field.value" :index="idx" @remove="remove(idx)" />
    </div>

    <!-- Кнопка открытия диалога -->

    <!-- Submit -->
    <el-button native-type="submit" type="primary"> Сохранить тренировку </el-button>
  </form>

  <!-- Диалог -->
  <AddExerciseDialog v-model="dialogFormVisible" @add="handleAddExercise" />
</template>
