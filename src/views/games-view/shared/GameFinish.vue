<template>
  <div class="container-bg-blur">
    <h1>Отличная работа!</h1>
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <div class="image">
        <img src="/images/games/trash/misc/finish.png" alt="" />
      </div>
    </template>
    <div class="actions">
      <button @click="onRestart"><RestartIcon />Ещё раз</button>
      <button @click="onHome"><HomeIcon />На главную</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeIcon from '@/components/icons/HomeIcon.vue'
import RestartIcon from '@/components/icons/RestartIcon.vue'
import { useRouter } from 'vue-router'
const props = defineProps<{
  currentGameLink: string
}>()
const router = useRouter()
const onRestart = () => {
  router.push(props.currentGameLink)
}
const onHome = () => {
  router.push('/games')
}
</script>

<style scoped lang="scss">
.container-bg-blur {
  display: flex;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-size: 120px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 140px;
  margin-top: 80px;
}
.actions {
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 356px;
  width: 1200px;
  gap: 40px;

  button {
    width: 100%;
    height: 100%;
    border-radius: 60px;
    color: #4fa127;
    font-size: 48px;
    font-weight: 600;
    line-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
}

.image {
  border-radius: 60px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 40px;

  img {
    width: 1120px;
    height: 1120px;
  }
}
</style>
