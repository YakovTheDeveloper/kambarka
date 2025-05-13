<template>
  <div class="cards">
    <div
      :class="['cards-card', current === index && 'cards-card_active']"
      v-for="(card, index) in props.variants"
      @click="() => onCardChoose(index)"
    >
      <p>{{ card.label }}</p>
      <p :style="{ fontSize: '80px', fontWeight: 'bold' }">{{ card.title }}</p>
      <component :is="current === index ? AcceptIcon : ChooseIcon"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import AcceptIcon from '../icons/AcceptIcon.vue'
import ChooseIcon from '../icons/ChooseIcon.vue'

const props = defineProps<{
  current: number
  variants: { title: string; label: string }[]
  onCardChoose: (idx: number) => void
}>()
</script>

<style scoped lang="scss">
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
