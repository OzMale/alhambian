<script setup lang="ts">
// You can add any reactive logic here if needed
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-5xl font-bold text-gray-900 mb-6 text-center">Alhambian</h1>
      <p class="text-xl text-gray-700 mb-8 text-center">Welcome to your Home Page</p>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-4 text-blue-600">Home Content</h2>
          <p class="text-gray-600">This is your main landing page with beautiful Tailwind styling.</p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-4 text-green-600">Features</h2>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Clean Design</li>
            <li>Responsive Layout</li>
            <li>Tailwind CSS</li>
            <li>Vue 3 Composition API</li>
          </ul>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink 
          to="/about" 
          class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Visit About Page
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* You can add custom styles here if needed, but Tailwind should cover most cases */
</style>