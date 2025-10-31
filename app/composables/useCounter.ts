export function useCounter(initialValue: number = 0) {
  const count = ref(initialValue)
  
  const increment = (): void => {
    count.value++
  }
  
  const decrement = (): void => {
    count.value--
  }
  
  const reset = (): void => {
    count.value = initialValue
  }
  
  const set = (value: number): void => {
    count.value = value
  }
  
  return {
    count,
    increment,
    decrement,
    reset,
    set
  }
}