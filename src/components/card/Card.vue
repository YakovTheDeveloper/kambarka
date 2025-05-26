<template>
  <div
    class="card"
    @click="onClick"
    :style="{
      background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.8) 100%), url('${getServerImageUrl($props.img)}') right/cover no-repeat`,
    }"
  >
    <div class="card-title" v-nbsp>{{ $props.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  img: string
  title: string
  id: string | number
  category: string
}>()
const onClick = () => props.category && router.push(props.category + '/' + props.id)
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
