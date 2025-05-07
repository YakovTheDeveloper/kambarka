<template>
  <div
    class="container-bg-blur container-padding"
    ref="containerRef"
    :style="{ overflow: 'hidden' }"
  >
    <div class="trash-container">
      <img
        v-for="(item, index) in store.currentItems.value"
        :key="index"
        :src="item.src"
        :style="{
          transform: 'translate(' + item.x + 'px, ' + item.y + 'px)',
          position: 'absolute',
          zIndex: 2,
        }"
        class="trash-item"
        @touchstart.prevent="startDrag(index, $event)"
        @touchmove.prevent="onDrag($event)"
        @touchend.prevent="endDrag"
        @mousedown.prevent="startDrag(index, $event)"
        @mousemove.prevent="onDrag($event)"
        @mouseup.prevent="endDrag"
      />
      <TrashGameBin
        v-for="bin in store.currentBins.value"
        :bin="bin"
        :binsToOpen="binsToOpen"
        :currentItems="store.currentItems.value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import TrashGameBin from './TrashGameBin.vue'
import { levelToBins, levelToItems } from './config'
import { useGameState } from './state'

const containerRef = ref<HTMLElement | null>(null)
const store = useGameState()

const BIN_WIDTH = 608
const BIN_HEIGHT = 1086

const dropZones = computed(() => {
  return levelToBins[store.difficulty].map((bin) => ({
    x: bin.x,
    y: bin.y,
    width: BIN_WIDTH,
    height: BIN_HEIGHT,
    type: bin.type, // Optional, helps identify the bin
  }))
})

function isPointInZone(
  pointX: number,
  pointY: number,
  zone: { x: number; y: number; width: number; height: number },
) {
  return (
    pointX >= zone.x &&
    pointX <= zone.x + zone.width &&
    pointY >= zone.y &&
    pointY <= zone.y + zone.height
  )
}

const draggingIndex = ref<number | null>(null)
const offset = ref({ x: 0, y: 0 })

const currentPos = ref({ x: 0, y: 0 })

function getEventPosition(event: TouchEvent | MouseEvent) {
  if ('touches' in event) {
    const touch = event.touches[0]
    return { x: touch.clientX, y: touch.clientY }
  } else {
    return { x: event.clientX, y: event.clientY }
  }
}

function startDrag(index: number, event: TouchEvent | MouseEvent) {
  draggingIndex.value = index
  const pos = getEventPosition(event)
  const item = store.currentItems.value[index]
  offset.value.x = pos.x - item.x
  offset.value.y = pos.y - item.y
}

function onDrag(event: TouchEvent | MouseEvent) {
  if (draggingIndex.value === null) return
  const pos = getEventPosition(event)
  const item = store.currentItems.value[draggingIndex.value]
  item.x = pos.x - offset.value.x
  item.y = pos.y - offset.value.y
  currentPos.value = pos
}

function clampItemToContainer(index: number) {
  const item = store.currentItems.value[index]
  const itemSize = 360 // replace if needed with actual size
  const x = item.x
  const y = item.y

  console.log(`output->item`, item)

  // Clamp X between 0 and (viewport width - item size)
  item.x = Math.max(0, Math.min(x, 3840 - itemSize))

  // Clamp Y between 0 and (viewport height - item size)
  item.y = Math.max(0, Math.min(y, 2160 - itemSize))
}

function endDrag() {
  if (draggingIndex.value !== null) {
    clampItemToContainer(draggingIndex.value)

    const droppedItem = store.currentItems.value[draggingIndex.value]
    dropZones.value.forEach((zone) => {
      const res = isPointInZone(droppedItem.x, droppedItem.y, zone)
      if (!res) return
      if (zone.type !== droppedItem.type) return
      store.removeItem(droppedItem.src)
    })

    // Log or handle the dropped item and its position
    console.log('Dropped item:', droppedItem)
    console.log('Final position:', { x: droppedItem.x, y: droppedItem.y })
  }
  draggingIndex.value = null
}

const binsToOpen = ref({})

watchEffect(() => {
  dropZones.value.forEach((zone) => {
    const res = isPointInZone(currentPos.value.x, currentPos.value.y, zone)
    binsToOpen.value = { ...binsToOpen.value, [zone.type]: res }
  })
})

watchEffect(() => {
  //   console.log(`output->binsToOpen`, binsToOpen.value)
})
</script>

<style scoped>
.trash-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.trash-item {
  position: absolute;
  object-fit: contain;
  cursor: grab;
}
</style>
