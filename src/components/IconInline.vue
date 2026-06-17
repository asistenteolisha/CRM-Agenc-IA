<script setup lang="ts">
import { lucideIcons } from '../utils/icons'

const props = defineProps<{ name: string; size?: number; class?: string }>()
const icon = lucideIcons[props.name]

if (!icon && import.meta.env.DEV) {
  console.warn(`Icon "${props.name}" not found in lucideIcons`)
}
</script>

<template>
  <svg v-if="icon" :viewBox="icon.viewBox" :width="size ?? icon.w" :height="size ?? icon.h"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       :class="$attrs.class" v-bind="$attrs">
    <path :d="icon.d"/>
  </svg>
</template>
