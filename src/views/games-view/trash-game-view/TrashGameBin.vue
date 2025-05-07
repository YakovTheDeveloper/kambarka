<template>
  <img
    :src="!shouldOpen ? `${bin.src}.png` : `${bin.src}-open.png`"
    alt=""
    :style="{ top: bin.y + 'px', left: bin.x + 'px', position: 'absolute', zIndex: 1 }"
    v-if="!shouldEnd"
  />
  <img
    :src="`${bin.src}-solved.png`"
    alt=""
    :style="{ top: bin.y + 'px', left: bin.x + 'px', position: 'absolute', zIndex: 1 }"
    v-else
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
  currentItems: {
    src: string
    x: number
    y: number
    type: string
  }[]
}>()

const shouldEnd = computed(
  () =>
    !props.currentItems?.some((item) => {
      console.log(`item.type ->`, item.type, props.bin.type)
      return item.type === props.bin.type
    }),
)

const shouldOpen = computed(() => props.binsToOpen[props.bin.type] === true)
</script>

<style scoped></style>
