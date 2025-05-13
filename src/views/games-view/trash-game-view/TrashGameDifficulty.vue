<template>
  <div class="container-padding container-bg">
    <Header title="Мемори" />
    <DifficultyChoice route-to-game="/games/trash" :current="current" title="Выберите сложность">
      <DifficultyChoiceCards
        :variants="[
          { title: 'Новичок', label: '4 карточки' },
          { title: 'Продвинутый', label: '6 карточек' },
          { title: 'Профессионал', label: '12 карточек' },
        ]"
        :current="current"
        @card-choose="(idx) => (current = idx)"
      />
    </DifficultyChoice>
  </div>
</template>

<script setup lang="ts">
import DifficultyChoice from '@/components/difficulty-choice/DifficultyChoice.vue'
import DifficultyChoiceCards from '@/components/difficulty-choice/DifficultyChoiceCards.vue'
import Header from '@/views/shared/header/Header.vue'
import { ref, watchEffect } from 'vue'

const current = ref(0)
</script>

<style scoped></style>
