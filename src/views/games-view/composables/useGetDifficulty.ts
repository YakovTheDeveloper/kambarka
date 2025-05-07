import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export function useGetDifficulty() {
  const route = useRoute()

  const difficulty = computed(() => {
    const difficultyParam = route.query.difficulty
    return difficultyParam ? Number(difficultyParam) : 1
  })

  watchEffect(() => {
    console.log(`output->difficulty`, difficulty.value)
  })

  return {
    difficulty,
  }
}
