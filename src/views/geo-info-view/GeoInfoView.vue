<template>
  <div class="container-bg-blur container-padding">
    <Header :has-back-button="true" title="Географическая справка" />
    <div class="content">
      <img src="/images/geo-info/map.png" alt="" class="map" :draggable="false" />
      <img src="/images/geo-info/content.png" alt="" :draggable="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../shared/header/Header.vue'
</script>

<style scoped lang="scss">
.content {
  display: grid;
  gap: 48px;
  grid-template-columns: 1200px 1fr;

  img {
    user-select: none;
  }

  .map {
    border-radius: 60px;
  }
}
</style>
