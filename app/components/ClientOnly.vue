<template>
  <div>
    <slot v-if="mounted" />
    <div v-else class="p-4 bg-gray-100 rounded text-center text-gray-500 text-sm">
      Loading interactive content...
    </div>
  </div>
</template>

<script setup lang="ts">
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>