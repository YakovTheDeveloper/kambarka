<template>
  <div :class="galleryClasses">
    <swiper
      :modules="modules"
      :pagination="true"
      :navigation="{
        nextEl: nextElRef,
        prevEl: prevElRef,
      }"
      class="swiper-main"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="{ id, image } in props.photos" :key="id" class="swiper-main-item">
        <img :src="getServerImageUrl(image)" class="swiper-main-item-bg" />
        <img :src="getServerImageUrl(image)" class="swiper-main-item-img" />
      </swiper-slide>

      <template #container-end>
        <button ref="prevElRef" class="swiper-button-prev">
          <span class="swiper-button-inner">
            <ArrowLeftIcon class="swiper-button-icon" />
          </span>
        </button>
        <button ref="nextElRef" class="swiper-button-next">
          <span class="swiper-button-inner">
            <ArrowRightIcon class="swiper-button-icon" />
          </span>
        </button>
      </template>
    </swiper>
    <p class="gallery-title">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { computed, ref, watchEffect } from 'vue'
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '../icons/ArrowRightIcon.vue'
import { getServerImageUrl } from '@/utils/getServerImageUrl'

const props = defineProps<{
  photos: { id: number; image: string }[]
  title: string
}>()

const galleryClasses = computed(() =>
  props.photos.length > 1 ? 'gallery' : 'gallery no-pagination',
)

const prevElRef = ref<HTMLElement | null>(null)
const nextElRef = ref<HTMLElement | null>(null)
const modules = [Navigation, Pagination]

const activeIndex = ref(0)

function onSlideChange(swiper: any) {
  activeIndex.value = swiper.activeIndex
}
</script>

<style scoped lang="scss">
::v-deep(.swiper-pagination) {
  .no-pagination & {
    display: none;
  }

  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 36px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: fit-content;
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);

  .swiper-pagination-bullet {
    opacity: 0.3;
    background-color: #fff;
    width: 24px;
    height: 24px;

    &-active {
      opacity: 1;
    }
  }
}

.title {
  margin-bottom: 20px;
  color: var(--text-secondary);
  font-size: 30px;
}

.gallery {
  border-radius: 20px;
  min-height: 100%;
  //   width: 100%;
  width: fit-content;
  position: relative;
  padding: 40px;
  border-radius: 64px;
  background-color: rgba(255, 255, 255, 0.7);
  margin-right: 48px;

  &-title {
    font-weight: 700;
    font-size: 64px;
    line-height: 100%;
    color: #323232;
    max-width: 1120px;
    margin-top: 73px;
    margin-bottom: 20px;
    text-align: center;
  }
}

.swiper-main {
  height: 1493px;
  width: 1120px;
  border-radius: 24px;

  &-item {
    position: relative;
    overflow: hidden;

    &-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      filter: blur(30px);
      object-fit: cover;
      z-index: -1;
      border-radius: 24px;
    }

    &-img {
      position: absolute;
      border-radius: 24px;
      bottom: 50%;
      transform: translateY(50%);
      width: 100%;
      margin: auto;
      object-fit: contain;
    }

    // img {
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    // }
  }
}

::v-deep(.swiper-button-disabled) {
  display: none;
}

.swiper-button-inner {
  z-index: 2;
  width: 96px;
  height: 96px;
  background-color: rgba(79, 161, 39, 0.6);
  color: var(--text-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:after {
    display: none !important;
  }
}

.swiper-button-prev,
.swiper-button-next {
  &:disabled {
    display: none;
  }
}

.swiper-button-next {
  right: 80px;
}

.swiper-button-prev {
  left: 80px;
}

.swiper-button-next,
.swiper-button-prev {
  background-color: transparent;

  &:after {
    display: none;
  }
}

.swiper-button-icon {
  width: 20px;
}
</style>
