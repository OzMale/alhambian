<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Composables Demo</h1>

      <!-- Working counters -->
      <UiCard title="useCounter Composable Demo" class="mb-8">
        <p class="text-gray-600 mb-4">
          Each counter uses its own instance of the <code>useCounter</code> composable.
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center p-4 bg-white rounded-lg border">
            <h3 class="font-semibold mb-2">Counter A</h3>
            <p class="text-2xl font-bold text-blue-600">{{ counterA.count }}</p>
            <div class="flex gap-1 justify-center mt-2">
              <UiButton size="sm" @click="counterA.increment()" label="+1" />
              <UiButton size="sm" variant="outline" @click="counterA.decrement()" label="-1" />
            </div>
          </div>

          <div class="text-center p-4 bg-white rounded-lg border">
            <h3 class="font-semibold mb-2">Counter B</h3>
            <p class="text-2xl font-bold text-green-600">{{ counterB.count }}</p>
            <div class="flex gap-1 justify-center mt-2">
              <UiButton size="sm" @click="counterB.increment()" label="+1" />
              <UiButton size="sm" variant="outline" @click="counterB.decrement()" label="-1" />
            </div>
          </div>

          <div class="text-center p-4 bg-white rounded-lg border">
            <h3 class="font-semibold mb-2">Counter C</h3>
            <p class="text-2xl font-bold text-purple-600">{{ counterC.count }}</p>
            <div class="flex gap-1 justify-center mt-2">
              <UiButton size="sm" @click="counterC.increment()" label="+1" />
              <UiButton size="sm" variant="outline" @click="counterC.decrement()" label="-1" />
            </div>
          </div>
        </div>

        <div class="mt-4 flex gap-2 justify-center">
          <UiButton variant="outline" size="sm" @click="resetAllCounters" label="Reset All" />
        </div>
      </UiCard>

      <!-- Simple working modal -->
      <UiCard title="Simple Modal Demo" class="mb-8">
        <p class="text-gray-600 mb-4">
          This uses simple local state that definitely works.
        </p>

        <div class="flex gap-3 flex-wrap mb-4">
          <UiButton @click="showSuccessNotification" label="Show Success" />
          <UiButton variant="secondary" @click="showErrorNotification" label="Show Error" />
          <UiButton @click="openModal" label="Open Modal" />
        </div>

        <!-- Notification display -->
        <div v-if="notification" :class="[
          'p-3 rounded border mb-4 transition-all duration-300',
          notification.type === 'success' ? 'bg-green-100 border-green-300 text-green-800' : '',
          notification.type === 'error' ? 'bg-red-100 border-red-300 text-red-800' : '',
          notification.type === 'info' ? 'bg-blue-100 border-blue-300 text-blue-800' : ''
        ]">
          {{ notification.message }}
        </div>

        <p class="text-sm text-gray-500">
          Modal state: {{ modalOpen ? 'Open' : 'Closed' }}
        </p>
      </UiCard>

      <!-- Client-only localStorage demo -->
      <ClientOnly>
        <UiCard title="useLocalStorage Composable Demo">
          <p class="text-gray-600 mb-4">
            This uses the <code>useLocalStorage</code> composable.
          </p>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Persistent Text</label>
              <input v-model="localStorageData.data" placeholder="Type something here..."
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <p class="text-sm text-gray-500 mt-1">Try refreshing the page - your text will still be here!</p>
            </div>

            <div class="flex gap-2">
              <UiButton variant="secondary" size="sm" @click="localStorageData.clear()" label="Clear Storage" />
            </div>

            <div class="p-3 bg-gray-50 rounded">
              <p class="text-sm font-mono">Stored value: "{{ localStorageData.data }}"</p>
            </div>
          </div>
        </UiCard>
      </ClientOnly>
            <!-- Navigation Section -->
      <UiCard title="Navigation" class="mt-8">
        <p class="text-gray-600 mb-4">
          Use these buttons to navigate between pages in the application.
        </p>
        
        <div class="grid md:grid-cols-3 gap-4">
          <UiButton 
            variant="outline"
            @click="goToHome"
            label="← Home"
            class="w-full"
          />
          <UiButton 
            variant="outline"
            @click="goToAbout"
            label="About →"
            class="w-full"
          />
          <UiButton 
            variant="outline"
            @click="goToSimpleDemo"
            label="Simple Demo →"
            class="w-full"
          />
        </div>

        <div class="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 class="font-semibold text-blue-800 mb-2">Current Route Info:</h4>
          <p class="text-sm text-blue-700">Path: <code class="bg-blue-100 px-1 rounded">{{ $route.path }}</code></p>
          <p class="text-sm text-blue-700">Page: <code class="bg-blue-100 px-1 rounded">{{ currentPageName }}</code></p>
        </div>
      </UiCard>
    </div>

    <!-- Simple working modal -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal">
      <div class="bg-white p-6 rounded-lg max-w-sm mx-4 shadow-xl" @click.stop>
        <h3 class="text-lg font-semibold mb-3">Working Modal! 🎉</h3>
        <p class="text-gray-600 mb-4">This modal uses simple local state and definitely works!</p>
        <UiButton @click="closeModal" label="Close Modal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Using our working composables!
const counterA = useCounter(0)
const counterB = useCounter(10)
const counterC = useCounter(100)

const localStorageData = useLocalStorage('composables-demo-text', 'Hello, composables!')

// Simple local state that definitely works
const modalOpen = ref(false)
const notification = ref<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

// Counter methods
const resetAllCounters = (): void => {
  counterA.reset()
  counterB.reset()
  counterC.reset()
}

// Notification methods
const showSuccessNotification = (): void => {
  notification.value = { message: 'This is a success message!', type: 'success' }
  clearNotificationAfterDelay()
}

const showErrorNotification = (): void => {
  notification.value = { message: 'This is an error message!', type: 'error' }
  clearNotificationAfterDelay()
}

const clearNotificationAfterDelay = (): void => {
  setTimeout(() => {
    notification.value = null
  }, 3000)
}

// Modal methods
const openModal = (): void => {
  console.log('Opening modal - setting to true')
  modalOpen.value = true
  console.log('Modal state after open:', modalOpen.value)
}

const closeModal = (): void => {
  console.log('Closing modal - setting to false')
  modalOpen.value = false
  console.log('Modal state after close:', modalOpen.value)
}

// Watch modal state for debugging
watch(modalOpen, (newValue) => {
  console.log('Modal state changed to:', newValue)
})

console.log('Initial modal state (simple):', modalOpen.value)

// Import the router (auto-imported by Nuxt, but we'll use it explicitly)
const router = useRouter()
const route = useRoute()

// Navigation methods
const goToHome = (): void => {
  router.push('/')
}

const goToAbout = (): void => {
  router.push('/about')
}

const goToSimpleDemo = (): void => {
  router.push('/composables-simple')
}

// Current page name for display
const currentPageName = computed(() => {
  switch (route.path) {
    case '/': return 'Home'
    case '/about': return 'About'
    case '/composables-demo': return 'Composables Demo'
    case '/composables-simple': return 'Simple Demo'
    default: return 'Unknown'
  }
})

// Optional: Log route changes for learning
watch(() => route.path, (newPath) => {
  console.log('Route changed to:', newPath)
})
</script>