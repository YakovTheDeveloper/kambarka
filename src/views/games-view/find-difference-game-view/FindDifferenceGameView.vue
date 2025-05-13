<template>
  <div class="container-padding container-bg-blur">
    <Header :hasBackButton="true" :has-home-button="true" title="Найди отличия"></Header>
    <div class="cards">
      <div
        class="cards-card"
        :style="{
          backgroundImage: `url(${cards[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <span
          @click="() => onClick(index)"
          v-for="(mark, index) in solutionMarks"
          :key="index"
          class="mark"
          :style="{
            position: 'absolute',
            top: `${mark.y}px`,
            left: `${mark.x}px`,
            opacity: foundIndices.includes(index) ? '1' : '0',
          }"
        />
      </div>
      <div
        class="cards-card"
        :style="{
          backgroundImage: `url(${cards[1]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <span
          @click="() => onClick(index)"
          v-for="(mark, index) in solutionMarks"
          :key="index"
          class="mark mark_second"
          :style="{
            position: 'absolute',
            top: `${mark.y}px`,
            left: `${mark.x}px`,
            opacity: foundIndices.includes(index) ? '1' : '0',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/shared/header/Header.vue'
import { computed, ref, watchEffect } from 'vue'
import { useGetDifficulty } from '../composables/useGetDifficulty'
import { useRouter } from 'vue-router'
import { difficultyData } from './config'

const difficultyStore = useGetDifficulty()
const router = useRouter()
const foundIndices = ref<number[]>([])
const onClick = (idx: number) => {
  if (!foundIndices.value.includes(idx)) {
    foundIndices.value.push(idx)
  }
}
const cards = computed(() => difficultyData[difficultyStore.difficulty.value || 1].cards)
const solutionMarks = computed(
  () => difficultyData[difficultyStore.difficulty.value || 1].solutions,
)

watchEffect(() => {
  console.log(`output->solutionMarks`, solutionMarks.value)
  console.log(`output->solutionMarks`, foundIndices.value.length, solutionMarks.value.length)
  if (foundIndices.value.length === solutionMarks.value.length) {
    router.push(`/games/find-difference/finish?difficulty=${difficultyStore.difficulty.value}`)
  }
})
</script>

<style scoped lang="scss">
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1800px;
  gap: 40px;

  &-card {
    border-radius: 60px;
    position: relative;
  }
}

.mark {
  width: 300px;
  height: 300px;
  // background-color: aqua;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    display: block;
    width: 196px;
    height: 196px;
    border: 18px solid #fff;
    border-radius: 50%;
  }

  &_second::after {
    border-color: #f53a3a;
  }
}
</style>
