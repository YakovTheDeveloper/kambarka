<template>
  <div class="cards">
    <div
      :class="['cards-card', current === index && 'cards-card_active']"
      v-for="(card, index) in props.variants"
      @click="() => onCardChoose(index)"
      :style="{
        backgroundImage: `url(${card.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <p class="cards-card-number" v-if="current !== index">{{ index + 1 }}</p>
      <AcceptIcon2 v-else class="cards-card-number" :style="{ background: 'none' }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AcceptIcon2 from '../icons/AcceptIcon2.vue'

const props = defineProps<{
  current: number
  variants: { img: string }[]
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
    height: 1186px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    justify-content: center;
    color: #ffffff;
    font-size: 64px;
    position: relative;

    &-number {
      position: absolute;
      bottom: 40px;
      left: 40px;
      width: 160px;
      height: 160px;
      background-color: #fff;
      border-radius: 50%;
      font-weight: 700;
      font-size: 80px;
      color: #4fa127;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &_active {
      box-shadow: inset 0 0 0 24px #4fa127;
    }
  }
}
</style>
