<template>
  <button @click="onStart">
    Начать игру
    <PlayIcon />
  </button>
</template>

<script setup lang="ts">
import PlayIcon from '@/components/icons/PlayIcon.vue'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps<{
  difficulty: number
  route: string
}>()
const router = useRouter()
const onStart = () => router.push(`${props.route}?difficulty=${props.difficulty + 1}`)
</script>

<style scoped>
button {
  background-color: rgba(79, 161, 39, 0.9);
  padding: 64px;
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-weight: 600;
  font-size: 48px;
  color: #fff;
  border: 4px solid #fff;
  border-radius: 60px;
  margin: 40px auto 0;
}
</style>
