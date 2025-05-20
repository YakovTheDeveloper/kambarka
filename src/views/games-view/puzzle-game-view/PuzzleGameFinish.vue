<template>
    <GameFinish current-game-link="/games/puzzle" class="container-bg-wood">

        <img :src="baseImagenh" alt="">
    </GameFinish>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import GameFinish from '../shared/GameFinish.vue'
import { getServerImageUrl } from '@/utils/getServerImageUrl';
import { useGameStore } from '@/stores/gameStore';
import { useGetDifficulty } from '@/views/games-view/composables/useGetDifficulty';
const store = useGameStore()
const difficulty = useGetDifficulty()
const baseImage = computed(() => {
    return getServerImageUrl(store.puzzleImages[difficulty.difficulty.value - 1]?.image)
})

</script>

<style scoped></style>
