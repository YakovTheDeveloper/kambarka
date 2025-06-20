<template>
  <!-- <div
    class="card"
    @click="onClick"
    :style="{
      background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.8) 100%), url('${getServerImageUrl($props.img)}') right/cover no-repeat`,
    }"
  > -->
  <div class="card" @click="onClick">
    <img :src="getServerImageUrl(props.img)" alt="" class="card-bg" />
    <img :src="getServerImageUrl($props.img)" alt="" class="card-img" />
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
  routerPostfix?: string
}>()
const onClick = () =>
  props.category &&
  router.push(props.category + '/' + props.id + (props.routerPostfix ? props.routerPostfix : ''))
</script>

<style scoped lang="scss">
.card {
  height: 777px;
  padding: 48px;
  display: flex;
  justify-content: end;
  border-radius: 24px;
  overflow: hidden;
  position: relative;

  &:after {
    position: absolute;
    z-index: 1;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 68%, rgba(0, 0, 0, 0.9) 100%);
    // background: linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.8) 100%);
    content: '';
  }

  &-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    filter: blur(17px);
    object-fit: cover;
    z-index: 0;
    border-radius: 24px;
  }

  &-img {
    position: absolute;
    border-radius: 24px;
    // bottom: 50%;
    inset: 0;
    height: 100%;
    width: 100%;
    // transform: translateY(50%);
    // width: 100%;
    margin: auto;
    object-fit: contain;
  }

  // &-gradient {
  //   z-index: 1;
  //   inset: 0;
  //   background: linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.8) 100%);
  // }

  &-title {
    font-weight: 600;
    font-size: 48px;
    line-height: 59px;
    text-align: center;
    margin-top: auto;
    color: white;
    position: relative;
    z-index: 2;
    width: 100%;
  }
}
</style>
