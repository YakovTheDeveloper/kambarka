<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import { useRedBookStore } from '@/stores/redbookStore';
import { useMonumentStore } from '@/stores/sightStore';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'


const redbookStore = useRedBookStore()
const monumentStore = useMonumentStore()
const gameStore = useGameStore()

onMounted(() => {
  redbookStore.fetchAll()
  monumentStore.fetchAll()
  gameStore.fetchAll()
})

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
