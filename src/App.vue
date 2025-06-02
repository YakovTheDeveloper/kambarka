<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import { useHabitatData } from '@/stores/habitatStore';
import { useHomeStore } from '@/stores/homeStore';
import { useRedBookStore } from '@/stores/redbookStore';
import { useMonumentStore } from '@/stores/memorialStore';
import { useInactivityTimer, useSleepingModeStore } from '@/stores/sleepingModeStore';
import WaitingMode from '@/views/shared/waiting-mode/WaitingMode.vue';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useSightStore } from '@/stores/sightStore';
import KeyBoardLetters from '@/components/keyboard/KeyBoardLetters.vue';


const redbookStore = useRedBookStore()
const monumentStore = useMonumentStore()
const gameStore = useGameStore()
const habitatStore = useHabitatData()
const homeStore = useHomeStore()
const sightStore = useSightStore()


useSleepingModeStore()

onMounted(() => {
  redbookStore.fetchAll()
  monumentStore.fetchAll()
  gameStore.fetchAll()
  habitatStore.fetchData()
  homeStore.fetchSections()
  sightStore.fetchAll()
})



</script>

<template>
  <RouterView />
  <WaitingMode />
</template>

<style scoped></style>
