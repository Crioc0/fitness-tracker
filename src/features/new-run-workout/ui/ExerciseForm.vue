<script setup lang="ts">
  import { computed, onUnmounted, ref } from 'vue'

  import { useTimer } from '../model/useTimer'

  import type { WorkoutTemplate } from '@/entities/workout'

  defineProps<{
    workout: WorkoutTemplate
  }>()

  const next = () => {
    currentRep.value++
  }

  const { remaining, start, stop, reset } = useTimer(next)

  const currentSet = ref(1)
  const isActive = computed(() => {
    return remaining.value !== 0
  })
  // Параметры круга
  const radius = 80 // радиус круга
  const circumference = 2 * Math.PI * radius // длина окружности

  // Прогресс в процентах (от 0 до 1)
  const progress = computed(() => {
    if (!isActive.value) return 1
    return remaining.value / 60 // 60 - начальное время
  })

  // Смещение для анимации (чем больше значение, тем меньше видимая часть)
  const dashOffset = computed(() => {
    return circumference * (1 - progress.value)
  })

  // Запуск таймера
  const startTimer = () => {
    start(60)
  }
</script>

<template>
  <div class="text-white flex items-center justify-center py-6">
    <div class="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-4">
      <!-- Header -->
      <div class="text-center relative flex items-center justify-center space-y-1">
        <h2 class="text-2xl font-semibold tracking-wide">
          {{ workout.title }}
        </h2>
      </div>

      <div class="flex justify-between items-end">
        <!-- Левый круг (повторы) -->
        <div class="text-center grid place-items-center max-w-20">
          <div
            class="border-5 w-15 h-15 grid place-items-center rounded-full text-lg border-green-700 mb-2"
          >
            {{ 10 }}
          </div>
          <div class="text-sm">Количество повторений</div>
        </div>
        <div>
          <div class="relative w-25 h-25">
            <!-- SVG круг для прогресса -->
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <!-- Фоновый круг -->
              <circle cx="100" cy="100" :r="radius" fill="none" stroke="#374151" stroke-width="8" />
              <!-- Прогресс круг -->
              <circle
                cx="100"
                cy="100"
                :r="radius"
                fill="none"
                stroke="#10B981"
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="dashOffset"
                class="transition-all duration-200 ease-linear"
              />
            </svg>

            <!-- Текст внутри круга -->

            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-bold">
                {{ remaining === 0 ? 60 : remaining }}
              </span>
            </div>
          </div>
          <div class="text-center">Таймер</div>
        </div>
        <!-- Центральный круг с таймером и прогрессом -->

        <!-- Правый круг (сеты) -->
        <div class="text-center grid place-items-center max-w-20">
          <div
            class="border-5 w-15 h-15 grid place-items-center rounded-full text-lg border-red-700 mb-2"
          >
            {{ currentSet }}/4
          </div>
          <div class="text-sm">Подходов выполнено</div>
        </div>
      </div>

      <div
        @click="startTimer"
        :class="[
          'text-center py-2 px-4 rounded-lg cursor-pointer transition-colors',
          isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700',
        ]"
      >
        {{ isActive ? 'Стоп' : 'Старт' }}
      </div>
    </div>
  </div>
</template>
