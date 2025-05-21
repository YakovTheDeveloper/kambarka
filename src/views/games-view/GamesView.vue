<template>
  <div class="container-bg container-padding">
    <Header title="Игры в музее" @back="router.push('/')" />
    <div class="cards">
      <div v-for="{ img, title, to } in cards" class="card" @click="router.push(to)">
        <h2>{{ title }}</h2>
        <img :src="img" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Header from '../shared/header/Header.vue'
const router = useRouter()
const cards = [
  { title: 'Пазлы', img: '/images/games/1.png', to: '/games/puzzle-difficulty' },
  { title: 'Мемори', img: '/images/games/2.png', to: '/games/memory-difficulty' },
  { title: 'Экология', img: '/images/games/3.png', to: '/games/trash-difficulty' },
  { title: 'Найди отличия', img: '/images/games/4.png', to: '/games/find-difference-difficulty' },
]
</script>

<style scoped lang="scss">
h2 {
  font-weight: 700;
  font-size: 80px;
  color: white;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 256px;
  gap: 40px;
}

.card {
  border-radius: 60px;
  background-color: rgba(79, 161, 39, 0.9);
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
}
</style>
