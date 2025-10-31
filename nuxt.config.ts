// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    // Private keys (server only) - only available on server side
    apiSecret: '', // Will be set via environment variables
    
    // Public keys (exposed to client)
    public: {
      apiBaseUrl: '', // Will be auto-filled from NUXT_PUBLIC_API_BASE_URL
      apiTimeout: '', // Will be auto-filled from NUXT_PUBLIC_API_TIMEOUT  
      nodeEnv: ''     // Will be auto-filled from NUXT_PUBLIC_NODE_ENV
    }
  }
})