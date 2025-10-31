export function useLocalStorage<T>(key: string, defaultValue: T) {
  // Initialize with default value (works on server and client)
  const data = ref<T>(defaultValue)
  
  // Only access localStorage on client side
  const initializeFromStorage = (): void => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key)
      if (stored) {
        try {
          data.value = JSON.parse(stored)
        } catch (error) {
          console.warn(`Error parsing localStorage item "${key}":`, error)
          data.value = defaultValue
        }
      }
    }
  }
  
  // Initialize when component mounts (client-side only)
  onMounted(() => {
    initializeFromStorage()
  })
  
  // Watch for changes and save to localStorage (client-side only)
  watch(data, (newValue) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.warn(`Error saving to localStorage "${key}":`, error)
      }
    }
  }, { deep: true })
  
  return {
    data,
    clear: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
        data.value = defaultValue
      }
    }
  }
}