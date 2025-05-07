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

.scrollbar {
  padding-right: 24px; // Or match your scrollbar width (e.g., 20px)
  overflow-y: auto;

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8 !important;
  }

  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(83, 83, 83, 0.07);
    background-color: rgba(21, 124, 79, 0.2);
    border-radius: 24px;
  }

  &::-webkit-scrollbar {
    width: 24px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4fa127;
    border-radius: 12px;
  }
}
</style>
