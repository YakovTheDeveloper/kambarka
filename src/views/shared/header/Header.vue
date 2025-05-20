<template>
  <div class="header">
    <button class="button" v-if="props.hasBackButton" @click="router.back()">
      <BackButtonIcon />
    </button>
    <h1>{{ $props.title }}</h1>
    <button class="button button_home" v-if="props.hasHomeButton" @click="router.push('/')">
      <HomeButtonIcon />
    </button>
    <div v-if="$slots.default" class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButtonIcon from '@/components/BackButtonIcon.vue'
import HomeButtonIcon from '@/components/HomeButtonIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = withDefaults(
  defineProps<{
    title?: string
    hasHomeButton?: boolean
    hasBackButton?: boolean
  }>(),
  {
    hasHomeButton: false,
    hasBackButton: true,
  },
)
</script>

<style scoped lang="scss">
h1 {
  font-weight: 700;
  font-size: 80px;
  line-height: 100%;
  color: white;
}

.header {
  display: flex;
  align-items: center;
  gap: 48px;
  margin-bottom: 40px;
  height: 160px;
}

.button {
  border-radius: 60px;
  overflow: hidden;

  &_home {
    margin-left: auto;
  }
}

.right {
  margin-left: auto;
}
</style>
