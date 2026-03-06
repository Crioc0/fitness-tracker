<script setup lang="ts">
  // import {  useForm } from 'vee-validate';
  // import * as zod from 'zod';
  // import { toTypedSchema } from '@vee-validate/zod';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  import TitleNav from '@shared/ui/TitleNav';

  // type InputNumberProps = {
  //   number1: number;
  //   number2: number;
  // };
  //
  // const validationSchema = toTypedSchema(
  //   zod.object({
  //     number1: zod
  //       .number({ error: 'Введите число' })
  //       .min(1, { message: 'Минимум 1' })
  //       .max(10, { message: 'Максимум 10' }),
  //
  //     number2: zod
  //       .number({ error: 'Введите число' })
  //       .min(1, { message: 'Минимум 1' })
  //       .max(10, { message: 'Максимум 10' })
  //       .optional(),
  //   })
  // );
  //
  // const { handleSubmit } = useForm<InputNumberProps>({
  //   validationSchema,
  //   initialValues: {
  //     number1: undefined,
  //     number2: undefined,
  //   },
  // });

  const route = useRoute();

  const pageTitle = computed<string>(() => {
    return (route.meta?.title as string) || 'Главная';
  });
</script>

<template>
  <div class="min-h-screen text-white">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <TitleNav :title="pageTitle" />
    </header>

    <!-- Timer Bar -->
    <!--    <div class="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">-->
    <!--      <TimerBar />-->
    <!--    </div>-->

    <main>
      <div class="container min-w-81.25 mx-auto flex flex-col px-2">
        <router-view />
      </div>
    </main>
  </div>
</template>
