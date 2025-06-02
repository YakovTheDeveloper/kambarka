<template>
  <div class="container-padding container-bg-wood">
    <Header title="Мемори" :has-back-button="true" :has-home-button="true"></Header>
    <Space :value="headerSpace" />
    <div class="cards" :style="gridStyle">
      <div class="card" :key="card.id" v-for="card in cards" @click="onCardClick(card)">
        <div class="card-inner" :class="{ flipped: isCardOpened(card.id) }">
          <div class="card-front"></div>
          <div class="card-back" :style="getOpenedCardStyle(card.id, card.image)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/shared/header/Header.vue'
import { useGetDifficulty } from '../composables/useGetDifficulty'
import { computed, onMounted, ref, watchEffect } from 'vue'
import Space from '@/components/space/Space.vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { getServerImageUrl } from '@/utils/getServerImageUrl'

const difficultyStore = useGetDifficulty()

const gridStyle = computed(() => {
  const gridConfig = {
    1: { gridTemplateColumns: 'repeat(3, 580px)', gridTemplateRows: 'repeat(2, 773px)' },
    2: { gridTemplateColumns: 'repeat(6, 580px)', gridTemplateRows: 'repeat(2, 773px)' },
    3: { gridTemplateColumns: 'repeat(8, 425px)', gridTemplateRows: 'repeat(3, 570px)' },
  }
  return gridConfig[difficultyStore.difficulty.value] || {}
})

const store = useGameStore()

onMounted(() => {
  store.fetchMemory(difficultyStore.difficulty.value)
})

const cards = computed(() => {
  const initCards = store.memoryDifficultyToImages[difficultyStore.difficulty.value]?.memoryImages
  if (!initCards) return []
  const doubled = initCards.flatMap((el, idx) => [
    { id: `${idx * 2 + 1}`, image: el.image },
    { id: `${idx * 2 + 2}`, image: el.image },
  ])
  return doubled
})

const headerSpace = computed(() => {
  const config = {
    1: '100',
    2: '100',
    3: '20',
  }
  return config[difficultyStore.difficulty.value]
})
const isCardOpened = (id: string) => {
  return cardsToShow.value.some((card) => card.id === id)
}

const getOpenedCardStyle = (id: string, image: string) => {
  if (cardsToShow.value.some((card) => card.id === id)) {
    return {
      background: `url(${getServerImageUrl(image)}) center no-repeat`,
    }
  }
  return {}
}

// const getOpenedCardStyle = (id: string, image: string) => {
//   if (cardsToShow.value.some((card) => card.id === id)) {
//     return {
//       background: url(${ getServerImageUrl(image) }) center no- repeat,
//     }
// }
// return {}
// }

type Card = { id: string; image: string }
const currentTurn = ref<Card[]>([])
const lock = ref(false)

const cardsToShow = ref<Card[]>([])

const onCardClick = (card: Card) => {
  if (lock.value) return // Ignore if locked (checking cards)
  if (currentTurn.value.length >= 2) return // Prevent flipping more than two cards at once
  if (cardsToShow.value.some((shownCard) => shownCard.id === card.id)) return // Ignore clicking already flipped card

  currentTurn.value = [...currentTurn.value, card]
  cardsToShow.value = [...cardsToShow.value, card]
}

watchEffect(() => {
  if (currentTurn.value.length === 2) {
    lock.value = true // immediately lock

    if (currentTurn.value[0].image === currentTurn.value[1].image) {
      // matched cards stay opened
      currentTurn.value = []
      lock.value = false
      return
    }

    // unmatched, flip back after timeout
    setTimeout(() => {
      cardsToShow.value = cardsToShow.value.filter(
        (card) => !currentTurn.value.some((turn) => turn.id === card.id),
      )
      currentTurn.value = []
      lock.value = false
    }, 1750)
  }
})

const router = useRouter()

watchEffect(() => {
  console.log(`output->cardsToShow.value`, cardsToShow.value)
  console.log(`output->cards.value.length`, cards.value.length)
  if (cardsToShow.value.length === 0 || cards.value.length === 0) return
  if (cardsToShow.value.length === cards.value.length) {
    setTimeout(() => {
      router.push('/games/memory/finish')
    }, 1000)
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
  border-radius: 60px;
  overflow: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;

  &-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1); // smoother easing
    will-change: transform;

    &.flipped {
      transform: rotateY(180deg);
    }
  }

  &-front,
  &-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 1px solid #ccc;
    border-radius: 60px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
  }

  &-front {
    background: url('/images/games/memory/card.png') center no-repeat;
    background-size: cover;
    /* Or a back design */
  }

  &-back {
    transform: rotateY(180deg);
    background-size: cover;
    background-position: center;
  }
}
</style>
