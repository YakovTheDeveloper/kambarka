<template>
  <div class="container-bg-blur container-padding">
    <Header :has-back-button="true" title="Географическая справка" />
    <div class="content">
      <img src="/images/geo-info/map.png" alt="" class="map" :draggable="false" />
      <div v-html="geographyData?.description"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../shared/header/Header.vue'

import { ref, onMounted } from 'vue'
import axios from 'axios'

const geographyData = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('http://api-kambarka-nature.test.itlabs.top/api/geography', {
      headers: {
        accept: 'application/json',
      },
    })
    geographyData.value = response.data[0]
  } catch (error) {
    console.error('Error fetching geography data:', error)
  }
})
</script>

<style scoped lang="scss">
.content {
  display: grid;
  gap: 48px;
  grid-template-columns: 1200px 1fr;

  font-weight: 400;
  font-size: 48px;
  line-height: 100%;
  color: #ffffff;

  img {
    user-select: none;
  }

  .map {
    border-radius: 60px;
  }
}
</style>
