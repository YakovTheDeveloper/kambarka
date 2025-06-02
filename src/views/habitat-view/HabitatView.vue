<template>
  <div class="container-bg container-padding">
    <Header :title="title">
      <Search :value="query" @change="onChange" @clear="clear" />
    </Header>
    <div class="bg-alpha content">
      <CardList>
        <Card v-for="card in filtered" :img="card.image" :title="card.title" category="habitat"
          @click="onCardClick(card.id)" :id="card.id" :key="card.id" />
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

const title = computed(() => {
  const queryParam = route.query.type

  if (queryParam === 'water') {
    return 'Водная среда обитания'
  } else if (queryParam === 'wind') {
    return 'Наземно-воздушная среда'
  } else if (queryParam === 'earth') {
    return 'Почвенная среда обитания'
  } else {
    return 'Cреда обитания' // Default case if no matching type is found
  }
})

const data = computed(() => {
  const queryParam = route.query.type

  if (queryParam === 'water') {
    return store.waterData
  } else if (queryParam === 'wind') {
    return store.windData
  } else if (queryParam === 'earth') {
    return store.earthData
  } else {
    return [] // Default case if no matching type is found
  }
})
const { filtered, query, onChange, clear } = useSearch(data.value)

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
import Search from '@/views/shared/search/Search.vue'
import { useSearch } from '@/views/shared/composables/useSearch'
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
