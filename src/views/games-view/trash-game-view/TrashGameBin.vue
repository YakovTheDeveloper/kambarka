<template>
  <img
    :src="!shouldOpen ? `${bin.src}.png` : `${bin.src}-open.png`"
    alt=""
    :style="{ top: bin.y + 'px', left: bin.x + 'px', position: 'absolute', zIndex: 1 }"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  bin: {
    src: string
    y: number
    x: number
    type: string
  }
  binsToOpen: Record<string, boolean>
}>()

const shouldOpen = computed(() => props.binsToOpen[props.bin.type] === true)

const isHover = ref(false)
</script>

<style scoped></style>
