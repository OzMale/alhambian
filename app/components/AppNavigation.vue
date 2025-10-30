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
          <NuxtLink 
            to="/" 
            class="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': $route.path === '/' }"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': $route.path === '/about' }"
          >
            About
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="isMobileMenuOpen" 
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              ></path>
              <path 
                v-else
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu (conditionally rendered) -->
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 py-4 space-y-4"
      >
        <NuxtLink 
          to="/" 
          @click="closeMobileMenu"
          class="block text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
          :class="{ 'text-blue-500': $route.path === '/' }"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          @click="closeMobileMenu"
          class="block text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
          :class="{ 'text-blue-500': $route.path === '/about' }"
        >
          About
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Vue Reactivity - our first reactive state!
const isMobileMenuOpen = ref(false)

// Methods to handle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>