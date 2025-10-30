<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">About Alhambian</h1>
        <p class="text-xl text-gray-700">Learn about our Vue.js and Nuxt journey</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">Our Story</h2>
        <div class="prose prose-lg text-gray-600">
          <p class="mb-4">
            This project is built with modern web technologies to provide the best developer and user experience.
          </p>
          <p class="mb-4">
            We're learning Vue 3, Nuxt 4, and TypeScript together while building real, functional applications.
          </p>
          <p>
            The navigation component you see above is our first reusable Vue component!
          </p>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink 
          to="/" 
          class="inline-block bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          ← Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>