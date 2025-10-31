// Fixed version - uses singleton pattern to maintain state
let state: {
  isLoading: boolean
  modalOpen: boolean
  notification: { message: string; type: 'success' | 'error' | 'info' } | null
} | null = null

export function useUiState() {
  // Initialize state only once (singleton pattern)
  if (!state) {
    state = reactive({
      isLoading: false,
      modalOpen: false,
      notification: null
    })
    
    console.log('useUiState: Initialized new state instance')
  }

  const showModal = (): void => {
    console.log('useUiState: showModal called')
    state!.modalOpen = true
    console.log('useUiState: modalOpen after show:', state!.modalOpen)
  }

  const hideModal = (): void => {
    console.log('useUiState: hideModal called')
    state!.modalOpen = false
    console.log('useUiState: modalOpen after hide:', state!.modalOpen)
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info'): void => {
    state!.notification = { message, type }
    
    setTimeout(() => {
      state!.notification = null
    }, 3000)
  }

  const startLoading = (): void => {
    state!.isLoading = true
  }

  const stopLoading = (): void => {
    state!.isLoading = false
  }

  return {
    // Return the reactive state directly
    ...toRefs(state!),
    // Actions
    showModal,
    hideModal,
    showNotification,
    startLoading,
    stopLoading
  }
}