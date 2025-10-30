<template>
  <div class="bg-gray-100 rounded-lg p-4 text-center">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">Page Visits</h3>
    <p class="text-3xl font-bold text-blue-600">{{ visitCount }}</p>
    <button 
      @click="incrementCount"
      class="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
    >
      Count Visit
    </button>
    <p class="text-sm text-gray-600 mt-2">Times you've visited: {{ visitCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// TypeScript: Explicitly type our ref
const visitCount = ref<number>(0)

// TypeScript: Function with return type
const incrementCount = (): void => {
  visitCount.value++
}

// TypeScript: We can type lifecycle hooks too
onMounted((): void => {
  console.log('VisitCounter component mounted')
  // We could load from localStorage here
})

// We could add more complex types:
interface VisitData {
  count: number
  lastVisit: Date
}

// Example of using an interface
const visitData = ref<VisitData>({
  count: 0,
  lastVisit: new Date()
})
</script>