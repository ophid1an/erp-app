<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    as?: keyof HTMLElementTagNameMap
  }>(),
  {
    variant: 'default',
    size: 'md',
    as: 'button',
  },
)

const classes = computed(() => {
  const base =
    'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 disabled:opacity-60 disabled:pointer-events-none'

  const variants: Record<Variant, string> = {
    default: 'bg-teal-600 text-white hover:bg-teal-500 shadow-sm',
    outline: 'border border-teal-200 text-teal-800 hover:bg-teal-50',
    ghost: 'text-teal-700 hover:bg-teal-50',
  }

  const sizes: Record<Size, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
  }

  return [base, variants[props.variant], sizes[props.size]].join(' ')
})
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
