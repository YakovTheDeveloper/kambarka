<template>
  <div :style="{ height: value + 'px' }"></div>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>

<style lang="scss" scoped></style>
