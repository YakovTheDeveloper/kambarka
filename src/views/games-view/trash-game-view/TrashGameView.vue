<template>
  <div class="container-bg-blur container-padding" ref="containerRef">
    <div class="trash-container">
      <img
        v-for="(item, index) in currentItems"
        :key="index"
        :src="item.src"
        :style="{ top: item.y + 'px', left: item.x + 'px', position: 'absolute', zIndex: 2 }"
        class="trash-item"
        @touchstart.prevent="startDrag(index, $event)"
        @touchmove.prevent="onDrag($event)"
        @touchend.prevent="endDrag"
        @mousedown.prevent="startDrag(index, $event)"
        @mousemove.prevent="onDrag($event)"
        @mouseup.prevent="endDrag"
      />
      <TrashGameBin v-for="bin in currentBins" :bin="bin" :binsToOpen="binsToOpen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import TrashGameBin from './TrashGameBin.vue'

const containerRef = ref<HTMLElement | null>(null)
const currentLevel = ref(1)
const BIN_WIDTH = 608
const BIN_HEIGHT = 1086

const levelToItems: Record<number, { src: string; x: number; y: number; type: string }[]> = {
  1: [
    { src: '/images/games/trash/plastic7.png', x: 0, y: 0, type: 'plastic' },
    { src: '/images/games/trash/plastic5.png', x: 50, y: 0, type: 'plastic' },
    { src: '/images/games/trash/plastic4.png', x: 100, y: 0, type: 'plastic' },
    { src: '/images/games/trash/paper6.png', x: 150, y: 0, type: 'paper' },
    { src: '/images/games/trash/plastic3.png', x: 200, y: 0, type: 'plastic' },
    { src: '/images/games/trash/metal4.png', x: 250, y: 0, type: 'metal' },
    { src: '/images/games/trash/metal.png', x: 300, y: 0, type: 'metal' },

    { src: '/images/games/trash/paper4.png', x: 0, y: 50, type: 'paper' },
    { src: '/images/games/trash/metal6.png', x: 50, y: 50, type: 'metal' },

    { src: '/images/games/trash/plastic.png', x: 100, y: 50, type: 'plastic' },
    { src: '/images/games/trash/plastic2.png', x: 150, y: 50, type: 'plastic' },
    { src: '/images/games/trash/paper.png', x: 200, y: 50, type: 'paper' },
    { src: '/images/games/trash/paper2.png', x: 250, y: 50, type: 'paper' },
    { src: '/images/games/trash/paper3.png', x: 300, y: 50, type: 'paper' },
    { src: '/images/games/trash/paper5.png', x: 0, y: 100, type: 'paper' },
    { src: '/images/games/trash/metal2.png', x: 50, y: 100, type: 'metal' },
    { src: '/images/games/trash/metal3.png', x: 100, y: 100, type: 'metal' },
    { src: '/images/games/trash/metal9.png', x: 150, y: 100, type: 'metal' },
  ],
}
const levelToBins: Record<number, { src: string; x: number; y: number; type: string }[]> = {
  1: [
    { src: '/images/games/trash/trash-bins/paper', x: 2500, y: 1150, type: 'paper' },
    { src: '/images/games/trash/trash-bins/plastic', x: 1500, y: 1150, type: 'plastic' },
    { src: '/images/games/trash/trash-bins/metal', x: 500, y: 1150, type: 'metal' },
  ],
}

const dropZones = computed(() => {
  const level = 1
  return levelToBins[level].map((bin) => ({
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

watchEffect(() => {
  console.log(`output->dropZones`, dropZones.value)
})

const currentBins = computed(() => levelToBins[currentLevel.value])
const currentItems = ref(levelToItems[currentLevel.value].map((item) => ({ ...item })))

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
  const item = currentItems.value[index]
  offset.value.x = pos.x - item.x
  offset.value.y = pos.y - item.y
}

function onDrag(event: TouchEvent | MouseEvent) {
  if (draggingIndex.value === null) return
  const pos = getEventPosition(event)
  const item = currentItems.value[draggingIndex.value]
  item.x = pos.x - offset.value.x
  item.y = pos.y - offset.value.y
  currentPos.value = pos
}

function clampItemToContainer(index: number) {
  if (!containerRef.value) return
  const container = containerRef.value
  const item = currentItems.value[index]

  const containerRect = container.getBoundingClientRect()
  const itemSize = 50 // adjust based on actual image size (or calculate dynamically)

  // Clamp x
  item.x = Math.max(0, Math.min(item.x, containerRect.width - itemSize))
  // Clamp y
  item.y = Math.max(0, Math.min(item.y, containerRect.height - itemSize))
}

function removeItem(inputSrc: string) {
  currentItems.value = currentItems.value.filter(({ src }) => inputSrc !== src)
}

function endDrag() {
  if (draggingIndex.value !== null) {
    clampItemToContainer(draggingIndex.value)

    const droppedItem = currentItems.value[draggingIndex.value]
    dropZones.value.forEach((zone) => {
      const res = isPointInZone(droppedItem.x, droppedItem.y, zone)
      if (!res) return
      if (zone.type !== droppedItem.type) return
      removeItem(droppedItem.src)
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
