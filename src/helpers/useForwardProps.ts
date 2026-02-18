import {computed} from 'vue'

export function useForwardProps<T extends  Record<string, unknown>, K extends keyof T>(props: T, exclude: readonly K[]) {
  return computed<Omit<T, K>>(()=>{
    const clone = {...props}
    for  (const key of exclude) {
      delete clone[key]
    }
    return clone
  })
}
