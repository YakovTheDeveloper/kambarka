<template>
  <div class="container-bg container-padding">
    <Header title="Игры в музее" />
    <div class="cards">
      <div v-for="{ img, title, to } in cards" class="card">
        <h2>{{ title }}</h2>
        <img :src="img" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../shared/header/Header.vue'

const cards = [
  { title: 'Пазлы', img: '/images/games/1.png', to: '' },
  { title: 'Мемори', img: '/images/games/2.png', to: '' },
  { title: 'Экология', img: '/images/games/3.png', to: '' },
  { title: 'Найди отличия', img: '/images/games/4.png', to: '' },
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
