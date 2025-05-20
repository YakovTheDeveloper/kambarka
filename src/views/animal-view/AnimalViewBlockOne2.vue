<template>
  <div class="col" v-if="title" :style="{ marginTop: '20px' }">
    <p class="sub">{{ title }}</p>
    <p>
      {{ desc }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  desc: string
}>()
</script>

<style scoped lang="scss">
@import url('./styles.scss');
</style>
