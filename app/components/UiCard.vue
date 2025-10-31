<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header p-6 pb-0">
      <slot name="header">
        <h3 v-if="title" class="text-xl font-semibold text-gray-900">{{ title }}</h3>
      </slot>
    </div>
    
    <div class="card-body p-6">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer p-6 pt-0">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CardProps {
  title?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<CardProps>(), {
  padding: 'md',
  shadow: 'md'
})

const cardClasses = computed(() => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }
  
  return `bg-white rounded-xl border border-gray-200 ${paddingClasses[props.padding]} ${shadowClasses[props.shadow]}`
})
</script>