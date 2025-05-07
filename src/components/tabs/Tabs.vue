<template>
  <div class="tabs">
    <div class="tabs-header">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tabs-item', { 'tabs-item_active': currentTab === tab.value }]"
        @click="selectTab(tab.value)"
      >
        {{ tab.value }}
      </button>
    </div>
    <div class="tabs-content">
      <slot :name="currentTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  value: string
}

const props = defineProps<{
  tabs: Tab[]
}>()

const currentTab = ref(props.tabs[0].value)

function selectTab(value: string) {
  currentTab.value = value
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  gap: 48px;

  &-header {
    display: flex;
    gap: 48px;
  }

  &-item {
    font-weight: 600;
    font-size: 48px;
    line-height: normal;
    color: #919191;
    border-bottom: 1px solid transparent;
    background-color: unset;

    &_active {
      position: relative;
      color: #4fa127;

      &:after {
        content: '';
        bottom: -8px;
        left: 0;
        position: absolute;
        height: 8px;
        border-radius: 4px;
        width: 100%;
        background-color: #4fa127;
      }
    }
  }
}
</style>
