<script lang="ts" setup>
  import Dumbbel from 'vue-material-design-icons/Dumbbell.vue'
  import { useRouter } from 'vue-router'

  import { useCreateWorkout } from '../model/useCreateWorkout.ts'
  import { useManageExercise } from '../model/useManageExercise.ts'
  import ExerciseCard from '../ui/ExerciseCard.vue'
  import SelectExerciseDialog from '../ui/SelectExerciseDialog.vue'

  import { useWorkoutTemplatesStore } from '@/entities/workout'
  import BaseInput from '@/shared/ui/BaseInput'
  import FormField from '@/shared/ui/FormField'
  import IconWrapper from '@/shared/ui/IconWrapper/IconWrapper.vue'

  const router = useRouter()
  const { onSubmit, errors, meta } = useCreateWorkout()
  const workoutTemplateStore = useWorkoutTemplatesStore()
  const { fields, dialogVisible, addExercise } = useManageExercise()

  // Обработчик для кнопки «Сохранить и начать тренировку»
  const handleSaveAndStart = async () => {
    const created = await onSubmit()
    if (created?.id) {
      workoutTemplateStore.selectWorkout(created)
      await router.push({ name: 'run-workout' })
    }
  }

  const handleSave = async () => {
    const created = await onSubmit()
    if (created?.id) {
      await router.push({ name: 'workouts' })
    }
  }
</script>

<template>
  <!-- Форма оставляет @submit для первой кнопки -->
  <form
    class="gap-4 py-4 w-full relative bg-inherit mx-auto items-center justify-between"
    @submit="onSubmit"
  >
    <FormField v-slot="{ field, error }" name="title">
      <BaseInput
        clearable
        placeholder="Название тренировки"
        size="large"
        style="width: 100%"
        v-bind="field"
        :error="error"
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
      <el-button type="primary" @click="dialogVisible = true">+ Добавить</el-button>
    </div>

    <div v-for="(field, idx) in fields" :key="field.key">
      <ExerciseCard :exercise="field.value" :index="idx" />
    </div>

    <div v-if="meta.touched && errors.exercises" class="text-red-500 text-sm mb-3">
      {{ errors.exercises }}
    </div>

    <div class="fixed bottom-0 left-0 w-full z-20 bg-inherit border-t">
      <div class="p-4 flex gap-3">
        <!-- Первая кнопка триггерит сабмит формы -->
        <el-button type="primary" @click="handleSave" class="flex-1"> Сохранить </el-button>

        <!-- Вторая кнопка – обычная, вызывает свой обработчик -->
        <el-button type="success" @click="handleSaveAndStart" class="flex-1">
          Сохранить и начать тренировку
        </el-button>
      </div>
    </div>
  </form>

  <SelectExerciseDialog @confirm="addExercise" v-model="dialogVisible" />
</template>
