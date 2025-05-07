import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useGetDifficulty } from '../composables/useGetDifficulty'
import { levelToBins, levelToItems } from './config'

export const useGameState = () => {
  const difficultyStore = useGetDifficulty()
  const router = useRouter()
  const currentBins = computed(() => levelToBins[difficultyStore.difficulty.value])
  const currentItems = ref(
    levelToItems[difficultyStore.difficulty.value].map((item) => ({ ...item })),
  )
  function removeItem(inputSrc: string) {
    currentItems.value = currentItems.value.filter(({ src }) => inputSrc !== src)
  }

  watch(
    () => currentItems.value.length,
    (newLength) => {
      if (currentItems.value.length === 0) {
        router.push('/games/trash/finish')
      }
    },
  )

  return {
    currentBins,
    currentItems,
    removeItem,
    difficulty: difficultyStore.difficulty.value,
  }
}
