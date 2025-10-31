<template>
  <nav class="bg-white shadow-lg border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo/Brand -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-500 rounded-lg"></div>
          <span class="text-xl font-bold text-gray-800">Alhambian</span>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': $route.path === '/' }">
            Home
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': $route.path === '/about' }">
            About
          </NuxtLink>

          <NuxtLink to="/composables-demo"
            class="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': $route.path === '/composables-demo' }">
            Composables
          </NuxtLink>

          <NuxtLink to="/api-demo" class="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': $route.path === '/api-demo' }">
            API
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            aria-label="Toggle mobile menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
              </path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu (conditionally rendered) -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200 py-4 space-y-4">
        <NuxtLink to="/" @click="closeMobileMenu"
          class="block text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
          :class="{ 'text-blue-500': $route.path === '/' }">
          Home
        </NuxtLink>

        <NuxtLink to="/about" @click="closeMobileMenu"
          class="block text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
          :class="{ 'text-blue-500': $route.path === '/about' }">
          About
        </NuxtLink>

        <NuxtLink to="/about" @click="closeMobileMenu"
          class="block text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
          :class="{ 'text-blue-500': $route.path === '/composables-demo' }">
          Composables
        </NuxtLink>

        <NuxtLink to="/about" @click="closeMobileMenu"
          class="block text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
          :class="{ 'text-blue-500': $route.path === '/api-demo' }">
          API
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Import Vue's ref function with TypeScript
import { ref } from 'vue'

// Define interface for component props (we'll use this later)
interface NavigationProps {
  // We can add props here in the future
  // Example: logoText?: string
}

// TypeScript: Explicitly type our reactive variables
const isMobileMenuOpen = ref<boolean>(false)

// TypeScript: Type our functions - they return void (nothing)
const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

// We could define emits for parent communication
// defineEmits<{
//   'menu-toggle': [isOpen: boolean]
// }>()
</script>