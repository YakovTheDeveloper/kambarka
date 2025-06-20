<template>
  <div class="container-bg container-padding container-bg-blur-2">
    <Header title="Достопримечательности района" />
    <div class="content">
      <Slider :photos="store.routeIdData?.image || []" :title="store.routeIdData?.title" />
      <div class="content-desc scrollbar scrollbar_white">
        <ItemDescription :items="textContentPlace || []">
          <div class="content-desc-images">
            <div v-for="{ image } in placeImages" :key="image" class="content-desc-images-image">
              <img :src="getServerImageUrl(image)" alt="" />
            </div>
          </div>
        </ItemDescription>
        <ItemDescription :items="textContent || []" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Slider from '@/components/slider/Slider.vue'
import Header from '../shared/header/Header.vue'
import ItemDescription from '../shared/item-description/ItemDescription.vue'
import Space from '@/components/space/Space.vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRedBookStore } from '@/stores/redbookStore'
import { useSightStore } from '@/stores/sightStore'
import { getServerImageUrl } from '@/utils/getServerImageUrl'

const store = useSightStore()
onMounted(() => {
  store.fetchOne()
})

watchEffect(() => console.log(store.routeIdData))

const textContentPlace = computed(() => {
  if (!store.routeIdData) return []
  const { place = '' } = store.routeIdData
  return [
    {
      id: 6,
      title: 'Расположение',
      description: place,
    },
  ]
})

const placeImages = computed(() => {
  if (!store.routeIdData) return []
  return store.routeIdData.landmarkRegionPlaceImages
})

const textContent = computed(() => {
  if (!store.routeIdData) return []
  const {
    history = '',
    description = '',
    simpleName = '',
    name = '',
    nowadays = '',
    status = '',
  } = store.routeIdData
  return [
    {
      id: 1,
      title: 'Название',
      description: name,
    },
    {
      id: 2,
      title: 'Обиходные названия',
      description: simpleName,
    },
    {
      id: 3,
      title: 'Статус',
      description: status,
    },
    {
      id: 4,
      title: 'Историческое исповедание',
      description: history,
    },
    {
      id: 5,
      title: 'Современная принадлежность',
      description: nowadays,
    },
    {
      id: 6,
      title: 'Описание',
      description: description,
    },
  ]
})
</script>

<style scoped lang="scss">
.content {
  display: flex;
  height: 1800px;

  &-desc {
    flex-grow: 1;

    &-images {
      height: 1096px;
      display: grid;
      grid-template-columns: 882px 1fr;
      gap: 40px;

      &-image {
        height: 100%;
        flex-grow: 0;
        overflow: hidden;
        border-radius: 40px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}

.additional-item {
  padding: 24px;
  gap: 24px;
  display: flex;
  align-items: center;
  border-radius: 24px;
  background-color: rgba(79, 161, 39, 0.8);
  font-weight: 600;
  font-size: 48px;
  color: #fff;
  margin-bottom: 24px;
}
</style>
