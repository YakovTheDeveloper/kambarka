<template>
  <div
    class="card"
    :style="{
      background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.8) 100%), url('${$props.img}') right/cover no-repeat`,
    }"
  >
    <div class="card-title">{{ $props.title }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  img: string
  title: string
}>()
</script>

<style scoped lang="scss">
.card {
  height: 777px;
  padding: 48px;
  display: flex;
  justify-content: end;
  border-radius: 24px;
  background-color: rebeccapurple;

  &-title {
    font-weight: 600;
    font-size: 48px;
    line-height: 59px;
    text-align: center;
    margin-top: auto;
    color: white;
    position: relative;
    z-index: 1;
    width: 100%;
  }
}
</style>
