<template>
  <div class="container-padding container-bg-blur">
    <Header :hasBackButton="true" :has-home-button="true" title="Найди отличия"></Header>
    <div class="cards">
      <div
        @click="onCardClick"
        class="cards-card"
        :style="{
          backgroundImage: `url(${cards[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>
      <div
        class="cards-card"
        :style="{
          backgroundImage: `url(${cards[1]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DifficultyChoice from '@/components/difficulty-choice/DifficultyChoice.vue'
import DifficultyChoiceCards from '@/components/difficulty-choice/DifficultyChoiceCards.vue'
import Header from '@/views/shared/header/Header.vue'
import { computed, ref, watchEffect } from 'vue'
import { useGetDifficulty } from '../composables/useGetDifficulty'
import { difficultyToCards } from './config'

const difficultyStore = useGetDifficulty()

const onCardClick = (e) => {
  const container = e.currentTarget.getBoundingClientRect()
  const x = Math.round(e.clientX - container.left)
  const y = Math.round(e.clientY - container.top)
  console.log(`{x:${x}, y:${y}}`)
}

const cards = computed(() => difficultyToCards[difficultyStore.difficulty.value || 1])
</script>

<style scoped lang="scss">
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1800px;
  gap: 40px;

  &-card {
    border-radius: 60px;
  }
}
</style>
