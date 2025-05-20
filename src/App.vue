<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import { useRedBookStore } from '@/stores/redbookStore';
import { useMonumentStore } from '@/stores/sightStore';
import { useInactivityTimer, useSleepingModeStore } from '@/stores/sleepingModeStore';
import WaitingMode from '@/views/shared/waiting-mode/WaitingMode.vue';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'


const redbookStore = useRedBookStore()
const monumentStore = useMonumentStore()
const gameStore = useGameStore()

useSleepingModeStore()

onMounted(() => {
  redbookStore.fetchAll()
  monumentStore.fetchAll()
  gameStore.fetchAll()
})

</script>

<template>
  <RouterView />
  <WaitingMode />
</template>

<style scoped></style>
