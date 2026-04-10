<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { useSelectWorkout } from '../model/useSelectWorkout.ts'

  import type { WorkoutTemplate } from '@/entities/workout'
  import { PlusBox, TrashCan } from '@/shared/icons'

  const { selectWorkout, deleteWorkoutTemplate, workoutTemplatesStore } = useSelectWorkout()
  const router = useRouter()

  async function select(workout: WorkoutTemplate) {
    selectWorkout(workout)
    await router.push({ name: 'run-workout' })
  }

  function addTraining() {
    router.push({ name: 'create-workout' })
  }
</script>

<template>
  <div class="bg-gray-950 text-white flex flex-col items-center justify-center py-6">
    <div class="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-4 space-y-6">
      <div class="relative flex items-center justify-center">
        <h2 class="text-2xl font-semibold tracking-wide text-center">Выберите тренировку</h2>
        <PlusBox @click="addTraining" :size="48" class="absolute right-0" />
      </div>

      <ul class="space-y-3">
        <li
          v-for="workout in workoutTemplatesStore.workoutTemplates"
          :key="workout.title"
          class="cursor-pointer p-4 bg-gray-800 rounded-2xl flex justify-between items-center hover:bg-gray-700 transition"
          @click="select(workout)"
        >
          <div>
            <h3 class="text-lg font-medium">{{ workout.title }}</h3>
            <p class="text-sm text-gray-400">{{ workout.exercises.length }} упражнений</p>
          </div>
          <div
            class="z-10 relative p-2 bg-white rounded-2xl"
            @click.stop="deleteWorkoutTemplate(workout.id)"
          >
            <TrashCan class="z-10 p-2relative" />
          </div>
        </li>
      </ul>

      <div
        v-if="workoutTemplatesStore.workoutTemplates.length === 0"
        class="text-center text-gray-400"
      >
        Тренировок не найдено
      </div>
    </div>
  </div>
</template>
