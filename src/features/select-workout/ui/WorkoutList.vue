<template>
  <div class="bg-gray-950 text-white flex flex-col items-center justify-center py-6">
    <div class="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-4 space-y-6">
      <h2 class="text-2xl font-semibold tracking-wide text-center">
        Выберите тренировку
      </h2>

      <ul class="space-y-3">
        <li
          v-for="workout in workouts"
          :key="workout.title"
          class="cursor-pointer p-4 bg-gray-800 rounded-2xl hover:bg-gray-700 transition"
          @click="select(workout)"
        >
          <h3 class="text-lg font-medium">{{ workout.title }}</h3>
          <p class="text-sm text-gray-400">
            {{ workout.exercises.length }} упражнений
          </p>
        </li>
      </ul>

      <div v-if="workouts.length === 0" class="text-center text-gray-400">
        Тренировок не найдено
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorkoutTemplate } from '@entities/workout';
import { useRouter } from 'vue-router';
import { useSelectWorkout } from '../model/useSelectWorkout.ts';

const { workouts, selectWorkout, loadWorkouts } = useSelectWorkout();
const router = useRouter();

async function select(workout: WorkoutTemplate) {
  selectWorkout(workout);
  await router.push({ name: 'run-workout' });
}

// при монтировании подгружаем список (даже если он локальный) чтобы сохранить pattern
loadWorkouts();
</script>
