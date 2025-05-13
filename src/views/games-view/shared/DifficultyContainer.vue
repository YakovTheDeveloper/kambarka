<template>
  <div class="difficulty">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
  <slot name="button"></slot>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
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
}
</style>
