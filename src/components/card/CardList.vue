<template>
  <div class="card-list scrollbar">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  max-height: 1630px;
  overflow-y: auto;
}
</style>
