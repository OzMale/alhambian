<template>
  <button
    :class="buttonClasses"
    :type="nativeType"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
// Define the component props with TypeScript interface
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  disabled?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
}

// Define props with types
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  label: '',
  disabled: false,
  nativeType: 'button'
})

// Define emits for parent communication
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Computed class based on props
const buttonClasses = computed(() => {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  return `${baseClasses} ${variants[props.variant]} ${sizes[props.size]} ${disabledClasses}`
})

// Event handler with proper typing
const handleClick = (event: MouseEvent): void => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>