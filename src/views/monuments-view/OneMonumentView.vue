<template>
  <div class="container-bg container-padding container-bg-blur-2">
    <Header title="Памятники природы" />
    <div class="content">
      <Slider
        :photos="[
          { id: 1, src: '/images/games/memory/card.png', title: '13' },
          { id: 2, src: '/images/games/memory/card.png', title: '14' },
          { id: 3, src: '/images/games/memory/card.png', title: '15' },
        ]"
      />
      <div class="content-desc">
        <Tabs :tabs="tabs" ref="tabsRef">
          <template #main>
            <Space value="50" />
            <ItemDescription :items="items" />
          </template>
          <template #another>
            <Space value="50" />
            <div v-for="item in 2" class="additional-item" @click="currentDocument = item">
              <DocumentIcon /> <span>Паспорт</span>
            </div>
          </template>
        </Tabs>
      </div>
    </div>
  </div>
  <teleport to="body">
    <MonumentDocuments v-show="currentDocument" @close="currentDocument = null" />
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
import { ref } from 'vue'

const tabs = [
  { value: 'main', label: 'Основная информация' },
  { value: 'another', label: 'Дополнительно' },
]

const items = [
  {
    id: 1,
    title: 'Название',
    description: 'Памятник природы регионального значения "Урочище "Валяй"',
  },
  {
    id: 2,
    title: 'Статус',
    description:
      'Урочище "Валяй" объявлено памятником природы постановлением Совета Министров Удмуртской АССР от 8 августа 1988 года N 238 "О признании памятниками природы природных достопримечательностей Удмуртской АССР"',
  },
  {
    id: 3,
    title: 'Расположение',
    description:
      'Расположено урочище на землях Камбарского лесничества и занимает площадь около 882,02 га',
  },
  {
    id: 4,
    title: 'Описание',
    description:
      'Урочище валяй - уникальный лес в Камбарском районе. Располагается на границе южной тайги, хвойно-лиственных лесов и северной лесостепи. Отсюда и биологическое разнообразие. Здесь можно встретить 87 редких и исчезающих видов растений, 3 вида редких грибов и 24 вида редких исчезающих животных. Здесь растут сосны которые  в диаметре достигают 180 см., кедры.',
  },
]

const currentDocument = ref(0)
</script>

<style scoped lang="scss">
.content {
  display: flex;

  &-desc {
    flex-grow: 1;
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
