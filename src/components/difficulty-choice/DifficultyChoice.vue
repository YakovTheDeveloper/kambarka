<template>
  <div class="difficulty">
    <h1>Выберите сложность</h1>
    <div class="cards">
      <div
        :class="['cards-card', current === index && 'cards-card_active']"
        v-for="(card, index) in props.variants"
        @click="current = index"
      >
        <p>{{ card.label }}</p>
        <p :style="{ fontSize: '80px', fontWeight: 'bold' }">{{ card.title }}</p>
        <component :is="current === index ? AcceptIcon : ChooseIcon"></component>
      </div>
    </div>
  </div>
  <button @click="onStart">
    Начать игру
    <PlayIcon />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AcceptIcon from '../icons/AcceptIcon.vue'
import ChooseIcon from '../icons/ChooseIcon.vue'
import PlayIcon from '../icons/PlayIcon.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  variants: { title: string; label: string }[]
  routeToGame: string
}>()

const router = useRouter()

const onStart = () => router.push(`${props.routeToGame}?difficulty=${current.value + 1}`)

const current = ref(0)
</script>

<style scoped lang="scss">
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
h1 {
  color: #323232;
  font-size: 80px;
  font-weight: 700;
  margin-bottom: 40px;
}
.difficulty {
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 60px;
  margin-top: 443px;
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  &-card {
    background-color: rgba(79, 161, 39, 0.5);
    padding: 80px;
    height: 544px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    justify-content: center;
    color: #ffffff;
    font-size: 64px;

    &_active {
      background-color: #4fa127;
    }
  }
}
</style>
