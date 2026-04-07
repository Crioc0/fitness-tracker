import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { clear, loadCompletedReps } from './persistence'

import {
  buildFinishedWorkoutDTO,
  useWorkoutSessionStore,
  type WorkoutSession,
} from '@/entities/workout-session'
import type { WorkPhase } from '@/entities/workout-session/model/session.types'

export const useEndWorkout = (workoutSession: WorkoutSession) => {
  const router = useRouter()
  console.log('new', workoutSession)
  const workoutSessionStore = useWorkoutSessionStore()
  const finishWorkout = async () => {
    try {
      const dto = buildFinishedWorkoutDTO(workoutSession)
      await workoutSessionStore.finishWorkoutSession(dto)
      console.log(workoutSessionStore.errorMessage)
      if (!workoutSessionStore.errorMessage) {
        await clear()
        router.push({ name: 'home' })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Реактивная переменная для хранения сгруппированных данных для формы
  const groupedByExercise = ref<Record<string, WorkPhase[]>>({})

  // Обновляем при монтировании и при изменении пропсов
  watch(
    () => workoutSession,
    (newSession) => {
      // Фильтруем только фазы с типом 'work'
      const workPhases = newSession.phases.filter((p) => p.type === 'work')

      // Группируем по exerciseTitle
      groupedByExercise.value = Object.groupBy(
        workPhases,
        ({ exerciseTitle }) => exerciseTitle
      ) as Record<string, WorkPhase[]>

      console.log('Grouped data:', groupedByExercise.value) // Для отладки
    },
    {
      immediate: true, // Выполнить сразу при монтировании
      deep: true, // Отслеживать глубокие изменения в объекте
    }
  )

  onMounted(async () => {
    // Загружаем данные о выполненных повторениях из IDB
    const completedRepsData = await loadCompletedReps()
    console.log('Данные из IDB:', completedRepsData)

    // Проходим по каждому упражнению в groupedByExercise
    for (const exerciseTitle in groupedByExercise.value) {
      const sets = groupedByExercise.value[exerciseTitle]
      console.log(`Сеты для упражнения "${exerciseTitle}":`, sets)

      // Получаем массив выполненных повторений для этого упражнения
      const exerciseCompletedReps = completedRepsData?.[exerciseTitle] || []

      // Обновляем каждый сет
      sets!.forEach((set, index) => {
        // Если есть данные для этого подхода, обновляем completedReps
        if (index < exerciseCompletedReps.length) {
          set.completedReps = exerciseCompletedReps[index]
        }
      })
    }

    console.log('Обновленные данные:', groupedByExercise.value)
  })

  return {
    finishWorkout,
    groupedByExercise,
  }
}
