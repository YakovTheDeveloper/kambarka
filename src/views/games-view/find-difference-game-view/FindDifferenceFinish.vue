<template>
  <GameFinish current-game-link="/games/find-difference-difficulty">
    <div class="content">
      <div
        v-for="url in result"
        :key="url"
        :style="{
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>
    </div>
  </GameFinish>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGetDifficulty } from '../composables/useGetDifficulty'
import GameFinish from '../shared/GameFinish.vue'
const difficultyStore = useGetDifficulty()
const difficultyToResult: Record<number, string[]> = {
  1: [
    '/images/games/find-difference/1-finish.png',
    '/images/games/find-difference/1-finish-second.png',
  ],
  2: [
    '/images/games/find-difference/2-finish.png',
    '/images/games/find-difference/2-finish-second.png',
  ],
  3: [
    '/images/games/find-difference/3-finish.png',
    '/images/games/find-difference/3-finish-second.png',
  ],
}
const result = computed(() => difficultyToResult[difficultyStore.difficulty.value || 1])
</script>

<style scoped lang="scss">
.content {
  display: grid;
  grid-template-columns: 1160px 1160px;
  grid-template-rows: 1160px;
  gap: 40px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 60px;
}
</style>
