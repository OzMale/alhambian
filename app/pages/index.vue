<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Welcome to Alhambian</h1>
        <p class="text-xl text-gray-700">Now with TypeScript! 🚀</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-4 text-blue-600">Home Page</h2>
          <p class="text-gray-600 mb-4">This is your main landing page with the new navigation.</p>
          <p class="text-gray-600">Notice how the "Home" link is highlighted in the navigation!</p>
        </div>
        
        <!-- Add our typed counter component -->
        <VisitCounter />
      </div>

      <div class="text-center">
        <NuxtLink 
          to="/about" 
          class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          Learn More About Us
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TypeScript: We can type page components too
// This runs on the server side in Nuxt
console.log('Home page loaded at:', new Date().toISOString())
</script>