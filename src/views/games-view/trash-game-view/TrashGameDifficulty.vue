<template>
  <div class="container-padding container-bg">
    <Header title="Мемори"></Header>
    <DifficultyChoice
      :variants="[
        { title: 'Новичок', label: '4 карточки' },
        { title: 'Продвинутый', label: '6 карточек' },
        { title: 'Профессионал', label: '12 карточек' },
      ]"
      route-to-game="/games/trash"
    />
  </div>
</template>

<script setup lang="ts">
import DifficultyChoice from '@/components/difficulty-choice/DifficultyChoice.vue'
import Header from '@/views/shared/header/Header.vue'
</script>

<style scoped></style>
