<template>
  <div class="row" :style="{ gap: '30px' }" v-if="title">
    <img :src="getServerImageUrl(props.img)" alt="" :style="{ width: '100px', height: '100px' }" />
    <div>
      <p class="sub_s">{{ title }}</p>
      <p class="fz-20">{{ desc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getServerImageUrl } from '@/utils/getServerImageUrl'

const props = defineProps<{
  title: string
  desc: string
  img: string
}>()
</script>

<style scoped lang="scss">
@import url('./styles.scss');

img {
  border-radius: 50%;
}
</style>
