<template>
  <div class="col" :v-if="title">
    <p class="sub_s">{{ title }}</p>
    <p>{{ desc }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  desc: string
}>()
</script>

<style scoped lang="scss">
@import url('./styles.scss');
</style>
