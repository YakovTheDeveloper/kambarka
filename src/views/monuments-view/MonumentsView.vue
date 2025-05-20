<template>
  <div class="container-bg container-padding">
    <Header title="Памятники природы">
      <Search :value="query" @change="onChange" />
    </Header>
    <div class="bg-alpha content">
      <CardList>
        <Card v-for="card in filtered" :img="card.image" :title="card.title" :key="card.id" category="monuments"
          :id="card.id" />
      </CardList>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import CardList from '@/components/card/CardList.vue'
import Header from '@/views/shared/header/Header.vue'
import { useMonumentStore } from '@/stores/sightStore'
import Search from '@/views/shared/search/Search.vue'
import { useSearch } from '@/views/shared/composables/useSearch'

const store = useMonumentStore()

const { filtered, query, onChange } = useSearch(store.data)

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
