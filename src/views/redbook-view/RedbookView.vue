<template>
  <div class="container-bg container-padding">
    <Header title="Красная книга Камбарского района">
      <Search :value="query" @change="onChange" @clear="clear" />

    </Header>
    <div :class="['bg-alpha', 'content', noData && 'content_no-data']">
      <CardList>
        <Card v-for="card in filtered" :img="card.image" :title="card.title" :key="card.id" category="redbook"
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
import { useSearch } from '@/views/shared/composables/useSearch'
import Search from '@/views/shared/search/Search.vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const { fetchAll } = useRedBookStore()
const store = storeToRefs(useRedBookStore())
const { filtered, query, onChange, clear, noData } = useSearch(store.data)
onMounted(() => fetchAll())

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
