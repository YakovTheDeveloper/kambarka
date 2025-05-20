<template>
  <div class="container-bg container-padding">
    <Header title="Достопримечательности района"></Header>
    <div class="bg-alpha content">
      <CardList>
        <Card
          v-for="card in data"
          :img="getServerImageUrl(card.image)"
          :title="card.title"
          @click="onCardClick(card.id)"
        ></Card>
      </CardList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const store = useHabitatData()

const data = computed(() => {
  const queryParam = route.query.type

  if (queryParam === 'water') {
    return store.waterData
  } else if (queryParam === 'wind') {
    return store.windData
  } else if (queryParam === 'earth') {
    return store.earthData
  } else {
    return null // Default case if no matching type is found
  }
})

const onCardClick = (id: number) => {
  router.push(`/habitat/${id}`)
}

import { ref } from 'vue'
import Header from '../shared/header/Header.vue'
import Card from '@/components/card/Card.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import CardList from '@/components/card/CardList.vue'
import { useHabitatData } from '@/stores/habitatStore'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
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
