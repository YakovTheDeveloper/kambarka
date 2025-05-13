<template>
  <div class="container-padding container-bg">
    <Header title="Найди отличия" />
    <Space value="40" />
    <DifficultyChoice
      route-to-game="/games/find-difference"
      :current="current"
      title="Выберите картинку"
    >
      <DifficultyChoiceImgCards
        :variants="variants"
        :current="current"
        @card-choose="(idx) => (current = idx)"
      />
    </DifficultyChoice>
  </div>
</template>

<script setup lang="ts">
import DifficultyChoice from '@/components/difficulty-choice/DifficultyChoice.vue'
import DifficultyChoiceImgCards from '@/components/difficulty-choice/DifficultyChoiceImgCards.vue'
import Space from '@/components/space/Space.vue'
import Header from '@/views/shared/header/Header.vue'
import { ref } from 'vue'

const variants = [
  { img: '/images/games/find-difference/1.png' },
  { img: '/images/games/find-difference/2.png' },
  { img: '/images/games/find-difference/3.png' },
]
const current = ref(0)
</script>

<style scoped lang="scss"></style>
