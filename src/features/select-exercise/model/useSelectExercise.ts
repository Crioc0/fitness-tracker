import { onMounted, ref } from 'vue';

export const useSelectExercise = ()=>{
  const exercises = ref([])

  onMounted(async ()=>{
    try {
      const res = await fetch('http://localhost:3000/exercises')
      exercises.value =await res.json()
    } catch (error) {
      console.log(error)
    }
  })

  return {
    exercises
  }
}
