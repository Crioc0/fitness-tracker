<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';

const exerciseDB = ref({
  bench_press: 'Жим лежа',
  squat: 'Присед',
  deadlift: 'Становая'
})

const trainings = ref<{id:number, title:string, reps}[]>([])
onMounted(async ()=> {
  try {
    const res = await fetch('http://localhost:3000/training')
    trainings.value= await res.json()
    console.log(trainings.value)
  } catch (error) {
    console.error(error)
  }
})

const renderReps = (reps: number) => {
  let result = ''
  for (let i = 1; i <= reps; i++) {
    result += `<div class="flex flex-col items-center"><label class="block">${i}</label><input type="checkbox"></div>`
  }
  return result
}

const addExercise = (ex: string) => {
  exerciseDB.value[1] = ex
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    {{exerciseDB}}
    <h1 class="text-3xl font-bold mb-8">Сегодняшняя тренировка</h1>
    {{trainings}}
    <div v-for="workout in trainings" :key="workout.id" class="flex gap-4 items-center mb-2">
      <article>
        <h2 class="text-2xl">{{workout.title}}</h2>
        <div class="flex gap-2" v-html="renderReps(workout.reps)"></div>
      </article>



    </div>

    <!-- Форма упражнений -->
    <div v-for="(ex, index) in exerciseDB" :key="index" class="mb-6 p-4 border rounded-lg">
      <h3>{{ ex }}</h3>

      <div v-for="set in trainings" :key="set.id" class="flex gap-4 items-center mb-2">
        <span>Подход {{ set.id }}</span>
        <input v-model.number="set.reps" type="number" placeholder="Повторы" class="w-20" />
        <input v-model.number="set.weight" type="number" step="0.5" placeholder="Вес" class="w-20" />
        <button @click="workoutsStore.updateSet(/*...*/)" class="text-green-600">✅</button>
      </div>
      <button @click="addSet(index)" class="text-sm text-blue-600">+ Подход</button>
    </div>

    <button @click="addExercise('bench_press')" class="bg-blue-600 text-white px-6 py-2 rounded">
      + Новое упражнение
    </button>
  </div>
</template>
