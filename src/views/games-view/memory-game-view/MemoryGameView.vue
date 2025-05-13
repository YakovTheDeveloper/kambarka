<template>
  <div class="container-padding container-bg-wood">
    <Header title="Мемори" :has-back-button="true" :has-home-button="true"></Header>
    <Space :value="headerSpace" />
    <div class="cards" :style="gridStyle">
      <div
        class="card"
        v-for="card in cards"
        :style="getOpenedCardStyle(card.id)"
        @click="onCardClick(card)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/shared/header/Header.vue'
import { useGetDifficulty } from '../composables/useGetDifficulty'
import { computed, ref, watchEffect } from 'vue'
import Space from '@/components/space/Space.vue'
import { useRouter } from 'vue-router'

const difficultyStore = useGetDifficulty()

const gridStyle = computed(() => {
  const gridConfig = {
    1: { gridTemplateColumns: 'repeat(3, 580px)', gridTemplateRows: 'repeat(2, 773px)' },
    2: { gridTemplateColumns: 'repeat(6, 580px)', gridTemplateRows: 'repeat(2, 773px)' },
    3: { gridTemplateColumns: 'repeat(8, 425px)', gridTemplateRows: 'repeat(3, 570px)' },
  }
  return gridConfig[difficultyStore.difficulty.value] || {}
})

const cards = computed(() => {
  const config = {
    1: [
      { id: 1, variant: 1 },
      { id: 2, variant: 1 },
      { id: 3, variant: 3 },
      { id: 4, variant: 2 },
      { id: 5, variant: 2 },
      { id: 6, variant: 3 },
    ],
    2: new Array(12).fill(' '),
    3: new Array(24).fill(' '),
  }
  return config[difficultyStore.difficulty.value] || {}
})

const headerSpace = computed(() => {
  const config = {
    1: '100',
    2: '100',
    3: '20',
  }
  return config[difficultyStore.difficulty.value]
})

const getOpenedCardStyle = (id: string) => {
  if (cardsToShow.value.some((card) => card.id === id)) {
    return {
      background: 'red',
    }
  }
  return {}
}
type Card = { id: string; variant: string }
const currentTurn = ref<Card[]>([])
const lock = ref(false)

const cardsToShow = ref<Card[]>([])

const onCardClick = (card: any) => {
  if (lock.value === true) return
  currentTurn.value = [...currentTurn.value, card]
  cardsToShow.value = [...cardsToShow.value, card]
}

watchEffect(() => {
  if (currentTurn.value.length === 2) {
    if (currentTurn.value[0].variant === currentTurn.value[1].variant) {
      currentTurn.value = []
      return
    }
    lock.value = true
    setTimeout(() => {
      cardsToShow.value = cardsToShow.value.filter(
        (card) => !currentTurn.value.some((turn) => turn.id === card.id),
      )
      currentTurn.value = []
      lock.value = false
    }, 1000)
  }
})

const router = useRouter()

watchEffect(() => {
  if (cardsToShow.value.length === cards.value.length) {
    router.push('/games/memory/finish')
  }
})
</script>

<style scoped lang="scss">
.cards {
  display: grid;
  gap: 40px;
  justify-content: center;
}

.card {
  background: url('/images/games/memory/card.png') center no-repeat;
  background-size: cover;
}
</style>
