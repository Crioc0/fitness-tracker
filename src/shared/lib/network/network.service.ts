import { onMounted, onUnmounted, ref } from 'vue';

export function useNetwork() {
  const isOnline = ref(navigator.onLine)

  const update = ()=> {
    isOnline.value = navigator.onLine
  }

  onMounted(()=>{
    window.addEventListener('online',update)
    window.addEventListener('ofline',update)
  })

  onUnmounted(()=>{
    window.removeEventListener('online',update)
    window.removeEventListener('ofline',update)
  })

  return {isOnline}
}
