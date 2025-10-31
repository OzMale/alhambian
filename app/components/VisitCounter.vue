<template>
  <div class="bg-gray-100 rounded-lg p-4 text-center">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">Page Visits</h3>
    <p class="text-3xl font-bold text-blue-600">{{ counter.count }}</p>
    
    <div class="flex gap-2 justify-center mt-3">
      <UiButton 
        size="sm" 
        variant="primary" 
        @click="counter.increment"
        label="+1"
      />
      <UiButton 
        size="sm" 
        variant="secondary" 
        @click="counter.decrement"
        label="-1"
      />
      <UiButton 
        size="sm" 
        variant="outline" 
        @click="counter.reset"
        label="Reset"
      />
    </div>
    
    <p class="text-sm text-gray-600 mt-2">Times you've visited: {{ counter.count }}</p>
    
    <!-- Show notification when counter reaches milestones -->
    <div 
      v-if="ui.notification"
      :class="[
        'mt-3 p-2 rounded text-sm',
        ui.notification.type === 'success' ? 'bg-green-100 text-green-800' : '',
        ui.notification.type === 'error' ? 'bg-red-100 text-red-800' : '',
        ui.notification.type === 'info' ? 'bg-blue-100 text-blue-800' : ''
      ]"
    >
      {{ ui.notification.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
// Import our composables - Nuxt auto-imports from app/composables/
const counter = useCounter(0)
const ui = useUiState()

// Watch for milestone achievements
watch(counter.count, (newCount) => {
  if (newCount === 5) {
    ui.showNotification('🎉 5 visits! Keep going!', 'success')
  } else if (newCount === 10) {
    ui.showNotification('🔥 10 visits! Amazing!', 'success')
  } else if (newCount < 0) {
    ui.showNotification('Counter cannot go below 0', 'error')
    counter.set(0) // Reset to 0 if it goes negative
  }
})
</script>