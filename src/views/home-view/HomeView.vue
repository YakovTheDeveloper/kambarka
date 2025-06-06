<script setup lang="ts">
import GameIcon from '@/components/icons/GameIcon.vue'
import GeoIcon from '@/components/icons/GeoIcon.vue'
import LeafIcon from '@/components/icons/LeafIcon.vue'
import StarsIcon from '@/components/icons/StarsIcon.vue'
import { useHabitatData } from '@/stores/habitatStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { Preview } from '@/stores/types'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import { useHomeStore } from '@/stores/homeStore'
import { storeToRefs } from 'pinia'



const { sections, arealCards, menuCards } = storeToRefs(useHomeStore())

const router = useRouter()
</script>

<template>
  <main class="container-padding container-bg">
    <h1 class="title white">Природа Камбарского района</h1>
    <div class="content">
      <div class="first">
        <div class="radius bg-alpha col padding">
          <h2 class="section-title">Среда обитания</h2>
          <div class="areal-cards row jcsb">
            <div v-for="card in arealCards" @click="router.push(card.to)" :key="card.title" class="areal-card" :style="{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.8) 100%), url('${card.image}') center/cover no-repeat`,
            }">
              <div class="areal-card-title">{{ card.titleServer }}</div>
            </div>
          </div>
        </div>
        <div class="radius bg-alpha col padding red-book" @click="router.push('/redbook')">
          <div class="image-box" :style="{
            background: `url(${getServerImageUrl(sections[3]?.image)}) center/cover no-repeat`,
            height: '804px',
            borderRadius: '24px'
          }"></div>
          <div class="row">
            <h2 class="section-title section-title_small">
              {{ sections[3]?.title }}
            </h2>
            <button class="button">Подробнее</button>
          </div>
        </div>
      </div>
      <div class="second">
        <div v-for="{ icon, titleHTML, to, titleServer } in menuCards" class="radius col padding second-card"
          @click="router.push(to)">
          <component :is="icon"></component>
          <p v-html="titleServer" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.red-book {
  justify-content: space-between;

  .row {
    display: grid;
    grid-template-columns: 60% 1fr;

    button {
      margin-top: auto;
      margin-left: auto;
    }
  }
}

.content {
  padding: 128px 0;
  display: flex;
  gap: 40px;
  flex-direction: column;
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 48px;
  gap: 24px;
  font-size: 48px;
  color: white;

  width: 390px;
  height: 155px;

  background: #4fa127;
  border-radius: 30px;

  flex: none;
  order: 1;
  flex-grow: 0;
}

.col {
  gap: 40px;
}

.padding {
  padding: 40px;
}

.section-title {
  font-weight: 700;
  font-size: 80px;
  line-height: 98px;
  color: #323232;

  &_small {
    font-size: 64px;
    line-height: normal;
  }
}

.first {
  display: grid;
  grid-template-columns: 2130px 1510px;
  height: 1115px;
  justify-content: space-between;
}

.second {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
  height: 404px;

  line-height: 100%;
  font-size: 48px;
  font-weight: 600;
  color: white;

  &-card {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: rgba(79, 161, 39, 0.9);
    border-radius: 60px;
    border: 4px solid white;
  }
}

.areal-cards {
  display: flex;
  gap: 40px;
  flex-grow: 1;

  * {
    flex-grow: 1;
  }
}

.areal-card {
  display: flex;
  border-radius: 24px;
  flex-grow: 1;
  flex-basis: 0;
  padding: 40px;
  position: relative;
  min-height: 400px;

  &-title {
    font-weight: 600;
    font-size: 48px;
    line-height: 59px;
    text-align: center;
    margin-top: auto;
    color: white;
    position: relative;
    z-index: 1;
  }
}

.image-box {}

.icon-box {}
</style>
