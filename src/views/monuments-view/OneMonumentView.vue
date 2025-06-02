<template>
  <div class="container-bg container-padding container-bg-blur-2">
    <Header title="Памятники природы" />
    <div class="content">
      <Slider
        :photos="store.routeIdData?.memorialNatureImages || []"
        :title="store.routeIdData?.title"
      />
      <div class="content-desc">
        <Tabs :tabs="tabs" ref="tabsRef">
          <template #main>
            <Space value="50" />
            <ItemDescription :items="textContent" />
          </template>
          <template #another>
            <Space value="50" />
            <div
              v-for="item in store.routeIdData?.memorialNatureMedia || []"
              class="additional-item"
              @click="currentDocument = item"
            >
              <div class="content-thumb">
                <DocumentIcon v-if="getMediaCategory(item.media) === 'document'" />
                <img
                  v-if="getMediaCategory(item.media) === 'image'"
                  :src="getServerImageUrl(item.media)"
                />
                <video
                  v-if="getMediaCategory(item.media) === 'video'"
                  :src="getServerImageUrl(item.media)"
                  preload="metadata"
                  muted
                  playsinline
                ></video>
                <PlayIcon
                  v-if="getMediaCategory(item.media) === 'video'"
                  class="content-thumb-video-icon"
                  :style="{ width: '80px', height: '80px' }"
                />
              </div>
              <span>{{ item.title }}</span>
            </div>
          </template>
        </Tabs>
      </div>
    </div>
  </div>
  <teleport to="body">
    <MonumentDocuments
      v-show="currentDocument"
      @close="currentDocument = null"
      :content="currentDocument"
    />
  </teleport>
</template>

<script setup lang="ts">
import Slider from '@/components/slider/Slider.vue'
import Header from '../shared/header/Header.vue'
import ItemDescription from '../shared/item-description/ItemDescription.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import Space from '@/components/space/Space.vue'
import DocumentIcon from '@/components/icons/DocumentIcon.vue'
import MonumentDocuments from './MonumentDocuments.vue'
import { computed, onMounted, ref } from 'vue'
import { useMonumentStore } from '@/stores/memorialStore'
import { getMediaCategory } from '@/utils/getMediaCategory'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import PlayIcon from '@/components/icons/PlayIcon.vue'

const store = useMonumentStore()
const currentDocument = ref<{
  id: number
  media: string
} | null>(null)
const tabs = [
  { value: 'main', label: 'Основная информация' },
  { value: 'another', label: 'Дополнительно' },
]

onMounted(() => {
  store.fetchOne()
})

const textContent = computed(() => {
  if (!store.routeIdData) return []
  const { description = '', place = '', name = '', status = '' } = store.routeIdData
  return [
    {
      id: 1,
      title: 'Название',
      description: name,
    },
    {
      id: 2,
      title: 'Статус',
      description: status,
    },
    {
      id: 3,
      title: 'Расположение',
      description: place,
    },
    {
      id: 4,
      title: 'Описание',
      description: description,
    },
  ]
})
</script>

<style scoped lang="scss">
.content {
  display: flex;

  &-desc {
    flex-grow: 1;
  }

  &-thumb {
    width: 120px;
    height: 120px;
    position: relative;

    &-video-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: rgba(79, 161, 39, 0.8);
      padding: 15px;
    }

    video {
      height: 100%;
      object-fit: cover;
    }

    * {
      height: 100%;
      width: 100%;
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

.preview-image {
  position: relative;
}
</style>
