<script setup lang="ts">
  import BaseNumberInput from '@/components/ui/BaseNumberInput';
  import {  useForm } from 'vee-validate';
  import * as zod from 'zod';
  import { toTypedSchema } from '@vee-validate/zod';

  type InputNumberProps = {
    number1: number;
    number2: number;
  };

  const validationSchema = toTypedSchema(
    zod.object({
      number1: zod
        .number({ error: 'Введите число' })
        .min(1, { message: 'Минимум 1' })
        .max(10, { message: 'Максимум 10' }),

      number2: zod
        .number({ error: 'Введите число' })
        .min(1, { message: 'Минимум 1' })
        .max(10, { message: 'Максимум 10' })
        .optional(),
    })
  );

  const { handleSubmit } = useForm<InputNumberProps>({
    validationSchema,
    initialValues: {
      number1: undefined,
      number2: undefined,
    },
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold from-primary-400 text-blue-400 bg-clip-text">💪 LiftLog</h1>
        <div class="flex gap-2">
          <RouterLink
            to="/today"
            class="px-4 py-2 rounded-xl text-white bg-slate-800 hover:bg-slate-700 transition-all"
          >
            Сегодня
          </RouterLink>
          <RouterLink
            to="/history"
            class="px-4 py-2 rounded-xl text-white bg-slate-800 hover:bg-slate-700 transition-all"
          >
            История
          </RouterLink>
        </div>
      </nav>
    </header>

    <!-- Timer Bar -->
    <div class="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
      <TimerBar />
    </div>

    <main class="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <form  @submit.prevent="onSubmit">
        <BaseNumberInput
          name="number1"
          label="Количество повторений"
          :size="'large'"
          :step="1"
          :min="1"
          :max="10"
        />
        <BaseNumberInput
          name="number2"
          label="Количество повторений"
          :size="'large'"
          :step="1"
          :min="1"
          :max="10"
        />
        <button type="submit">Отправить</button>
      </Form>
      <router-view />
    </main>
  </div>
</template>
