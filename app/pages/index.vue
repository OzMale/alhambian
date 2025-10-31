<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Welcome to Alhambian</h1>
        <p class="text-xl text-gray-700">Learning Vue Props & TypeScript! 🚀</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <UiCard title="Component Props" shadow="lg">
          <p class="text-gray-600 mb-4">This card demonstrates component props and slots.</p>
          <p class="text-gray-600 mb-6">We're passing props like <code>title</code> and <code>shadow</code> from parent to child.</p>
          
          <div class="flex gap-3 flex-wrap">
            <UiButton 
              variant="primary" 
              size="md" 
              label="Primary Button"
              @click="handleButtonClick"
            />
            <UiButton 
              variant="secondary" 
              size="sm" 
              label="Secondary"
            />
            <UiButton 
              variant="outline" 
              label="Outline"
            />
            <UiButton 
              :disabled="true" 
              label="Disabled"
            />
          </div>
        </UiCard>
        
        <UiCard padding="lg" shadow="sm">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-gray-900">Visit Counter</h3>
              <UiButton 
                variant="outline" 
                size="sm" 
                label="Reset" 
                @click="resetCounter"
              />
            </div>
          </template>
          
          <VisitCounter />
          
          <template #footer>
            <p class="text-sm text-gray-500">Footer slot content</p>
          </template>
        </UiCard>
      </div>

      <div class="text-center">
        <UiButton 
          variant="primary" 
          size="lg" 
          label="Go to About Page"
          @click="navigateToAbout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables are auto-imported in Nuxt
const router = useRouter()

const handleButtonClick = (event: MouseEvent): void => {
  console.log('Button clicked!', event)
  // You could show a notification, call an API, etc.
}

const resetCounter = (): void => {
  // We'll implement this when we learn state management
  console.log('Reset counter clicked')
}

const navigateToAbout = (): void => {
  router.push('/about')
}
</script>