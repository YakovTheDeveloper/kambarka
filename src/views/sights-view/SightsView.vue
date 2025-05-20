<template>
  <div class="container-bg container-padding">
    <Header title="Достопримечательности района"></Header>
    <div class="bg-alpha content">
      <Tabs :tabs="tabs" ref="tabsRef">
        <template #religion>
          <CardList>
            <Card v-for="card in store.religionData" :img="card.image" :title="card.title" :id="card.id"
              category="sights"></Card>
          </CardList>
        </template>
        <template #museum>
          <CardList>
            <Card v-for="card in store.museumData" :img="card.image" :title="card.title" :id="card.id"
              category="sights"></Card>
          </CardList>
        </template>
        <template #naturePlace>
          <CardList>
            <Card v-for="card in store.naturePlaceData" :img="card.image" :title="card.title" :id="card.id"
              category="sights"></Card>
          </CardList>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Header from '../shared/header/Header.vue'
import Card from '@/components/card/Card.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import CardList from '@/components/card/CardList.vue'
import { useSightStore } from '@/stores/sightStore'

const currentTab = ref('')

const tabs = [
  { value: 'religion', label: 'Религиозные сооружения' },
  { value: 'museum', label: 'Объекты музейного показа' },
  { value: 'naturePlace', label: 'Природные места' },
]

// const store = useSightStore()

const store = {
  religionData: [{ title: 'A', id: 1, img: '' }],
  museumData: [{ title: 'B', id: 2, img: '' }],
  naturePlaceData: [{ title: 'C', id: 3, img: '' }]
}

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
