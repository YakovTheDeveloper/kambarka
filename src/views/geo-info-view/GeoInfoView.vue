<template>
  <div class="container-bg-blur container-padding">
    <Header :has-back-button="true" title="Географическая справка" />
    <div class="content">
      <div class="map">
        <img :src="getServerImageUrl(geographyData?.image)" alt="" :draggable="false" />
      </div>
      <div class="content-text" v-html="fixOrphanWordsInHTML(geographyData?.description)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../shared/header/Header.vue'

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import { fixOrphanWordsInHTML } from '@/utils/fixOrphanWords'

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

  &-text {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .map {
    border-radius: 60px;
    width: 100%;

    img {
      user-select: none;
      width: 100%;
      object-fit: cover;
      border-radius: 60px;
    }
  }

  ::v-deep li {
    list-style-type: disc;
    margin-left: 1.5em;
  }
}
</style>
