<template>
  <DifficultyContainer :title="title">
    <slot></slot>
    <template #button>
      <StartGameButton :difficulty="current" :route="routeToGame" />
    </template>
  </DifficultyContainer>
</template>

<script setup lang="ts">
import StartGameButton from '@/views/games-view/shared/StartGameButton.vue'
import DifficultyContainer from '@/views/games-view/shared/DifficultyContainer.vue'
defineProps<{
  title: string
  routeToGame: string
  current: number
}>()
</script>

<style scoped lang="scss"></style>
