<template>
  <div class="container-padding container-bg">
    <Header title="Пазлы" />
    <Space value="40" />
    <DifficultyChoice route-to-game="/games/puzzle" :current="current" title="Выберите пазл">
      <DifficultyChoiceImgCards :variants="variants" :current="current" @card-choose="(idx) => (current = idx)" />
    </DifficultyChoice>
  </div>
</template>

<script setup lang="ts">
import DifficultyChoice from '@/components/difficulty-choice/DifficultyChoice.vue'
import DifficultyChoiceImgCards from '@/components/difficulty-choice/DifficultyChoiceImgCards.vue'
import Space from '@/components/space/Space.vue'
import { useGameStore } from '@/stores/gameStore'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import Header from '@/views/shared/header/Header.vue'
import { ref } from 'vue'


const store = useGameStore()
import { computed } from 'vue'

const variants = computed(() =>
  store.puzzleImages.map(({ id, image }) => ({ img: getServerImageUrl(image), id }))
)
const current = ref(0)
</script>

<style scoped lang="scss"></style>
