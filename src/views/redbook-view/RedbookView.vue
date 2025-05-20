<template>
  <div class="container-bg container-padding">
    <Header title="Красная книга Камбарского района"></Header>
    <div class="bg-alpha content">
      <CardList>
        <Card v-for="card in store.data" :img="card.image" :title="card.title" :key="card.id" category="redbook"
          :id="card.id" />
      </CardList>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../shared/header/Header.vue'
import Card from '@/components/card/Card.vue'
import CardList from '@/components/card/CardList.vue'
import { useRedBookStore } from '@/stores/redbookStore'
const store = useRedBookStore()

</script>

<style scoped lang="scss">
.content {
  padding: 40px;
  border-radius: 60px;
  display: flex;
  flex-direction: column;

  gap: 24px;
}
</style>
