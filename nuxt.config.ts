// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   modules: ['@nuxtjs/tailwindcss'],

   runtimeConfig: {
    // Private keys (server only)
    apiSecret: process.env.API_SECRET,
    
    // Public keys (exposed to client)
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5092/api',
      nodeEnv: process.env.NODE_ENV || 'development'
    }
  }
})
