<script setup lang="ts">
// About page logic can go here
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-5xl font-bold text-gray-900 mb-6 text-center">About Alhambian</h1>
      <p class="text-xl text-gray-700 mb-8 text-center">Learn more about our application</p>

      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">About This Project</h2>
        <p class="text-gray-600 mb-4">This is a modern Nuxt 4 application with Tailwind CSS, built with best practices
          and clean architecture.</p>

        <div class="grid grid-cols-2 gap-4 mt-6">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">2</div>
            <div class="text-gray-600">Pages</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">Vue 3</div>
            <div class="text-gray-600">Framework</div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink to="/"
          class="inline-block bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
          ← Back to Home
        </NuxtLink>       
         <div class="bg-alhambra-gold text-alhambra-blue">
          Custom styled element
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles if needed */
</style>