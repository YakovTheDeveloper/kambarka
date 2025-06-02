<template>
  <GameFinish
    current-game-link="/games/puzzle-difficulty"
    class="container-bg-blur"
    :side-buttons="true"
  >
    <div class="result">
      <img :src="baseImage" alt="" />
    </div>
  </GameFinish>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GameFinish from '../shared/GameFinish.vue'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import { useGameStore } from '@/stores/gameStore'
import { useGetDifficulty } from '@/views/games-view/composables/useGetDifficulty'
const store = useGameStore()
const difficulty = useGetDifficulty()
const baseImage = computed(() => {
  return getServerImageUrl(store.puzzleImages[difficulty.difficulty.value - 1]?.image)
})
</script>

<style scoped>
.result {
  width: 1820px;
  height: 1820px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 60px;
  padding: 40px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 60px;
  }
}
</style>
