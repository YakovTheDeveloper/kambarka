<template>
  <component :is="component" :difficulty="difficultyStore.difficulty.value" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useGetDifficulty } from '../composables/useGetDifficulty'

defineProps({
  component: {
    type: Object,
    required: true,
  },
})

const difficultyStore = useGetDifficulty()
</script>

<style scoped></style>
