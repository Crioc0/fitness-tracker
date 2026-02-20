<script setup lang="ts">

import BaseDialog from '@shared/ui/BaseDialog.vue';
import { useManageExercise } from '@features/create-workout/model/useManageExercise.ts';

const {handleAddExercise,dialogVisible, exerciseTitle } = useManageExercise()
</script>

<template>
  <BaseDialog title="Добавить упражнение" v-model="dialogVisible" @confirm="handleAddExercise">
    <el-input v-model="exerciseTitle" />
  </BaseDialog>
</template>
