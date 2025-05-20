<template>
  <div class="container container-padding container-bg-blur">
    <Header :has-back-button="true" :has-home-button="true" title="Пазлы"> </Header>
    <Space value="10" />
    <div class="row">
      <div class="puzzle-pieces"></div>

      <div
        class="puzzle-frame"
        :style="{
          // backgroundImage: `url('/images/games/puzzle/frame.png')`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }"
      >
        <img :src="gridImage" alt="" class="puzzle-grid" :draggable="false" />
        <img
          :src="baseImage"
          alt=""
          class="puzzle-image"
          ref="puzzleImageRef"
          @click="handleClick"
        />
      </div>
      <div class="puzzle-pieces">
        <template v-for="(piece, index) in pieces" :key="index">
          <span
            v-if="piece.show"
            :id="getGridItemId(piece.row, piece.col)"
            :style="{
              position: 'absolute',
              zIndex: 2,
              transform: `translate(${piece.x}px, ${piece.y}px)`,
            }"
            @touchstart.prevent="startDrag(index, $event)"
            @touchmove.prevent="onDrag($event)"
            @touchend.prevent="endDrag"
            @mousedown.prevent="startDrag(index, $event)"
            @mousemove.prevent="onDrag($event)"
            @mouseup.prevent="endDrag"
          >
            <PuzzlePiece
              :backgroundPosition="piece.backgroundPosition"
              :key="index"
              :row="piece.row"
              :col="piece.col"
              :size="pieceSize"
              :imageUrl="baseImage"
              :gridSize="gridSize"
              :shapeIndex="index + 1"
            />
          </span>
        </template>
      </div>
      <template v-for="(piece, index) in pieces" :key="index">
        <span
          :style="{
            left: `${pos[index].x}px`,
            top: `${pos[index].y}px`,
            position: 'absolute',
            zIndex: 2,
            display: puzzlesIds.includes(getGridItemId(piece.row, piece.col)) ? 'block' : 'none',
          }"
        >
          <PuzzlePiece
            :backgroundPosition="piece.backgroundPosition"
            :key="index"
            :row="piece.row"
            :col="piece.col"
            :imageUrl="baseImage"
            :gridSize="gridSize"
            :shapeIndex="index + 1"
          />
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Space from '@/components/space/Space.vue'
import Header from '@/views/shared/header/Header.vue'
import PuzzlePiece from './PuzzlePiece.vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import { usePuzzleSections } from './composables/PuzzleSections'
import { pos } from './data'

const puzzlesToOpen = ref<Record<string, boolean>>({})
const puzzlesIds = computed(() => Object.keys(puzzlesToOpen.value))
const removePuzzleFromUserCollection = () => {
  pieces.value = pieces.value.map((item, index) => {
    if (index === draggingIndex.value) {
      return { ...item, show: false }
    }
    return item
  })
}

const addSolvedPuzzleId = (row: number, col: number) => {
  puzzlesToOpen.value = {
    ...puzzlesToOpen.value,
    [getGridItemId(row, col)]: true,
  }
}

const gridSize = 6
const pieceSize = 320
const baseImage = '/images/games/puzzle/mock.png'
const gridImage = '/images/games/puzzle/grid.svg'
const puzzleImageRef = ref()
const draggingIndex = ref<number | null>(null)
const { gridSections, updateSectionsFromElement, getSectionFromScreenPoint } = usePuzzleSections()
const getGridItemId = (x, y) => {
  return `${x}/${y}`
}
onMounted(() => {
  nextTick(() => {
    updateSectionsFromElement(puzzleImageRef.value)
    console.log(`output->gridSections`, gridSections.value)
  })
})

function handleClick(e) {
  const section = getSectionFromScreenPoint(e.clientX, e.clientY)
  console.log('Clicked section:', section)
}
const offset = ref({ x: 0, y: 0 })

const currentPos = ref({ x: 0, y: 0 })
const pieces = ref(
  Array.from({ length: gridSize * gridSize }, (_, index) => {
    const row = Math.floor(index / gridSize)
    const col = index % gridSize
    const { backgroundPosition } = pos[index]
    let x = index % 2 === 0 ? -2500 : 300

    return { row, col, x, y: 42 * index, show: true, backgroundPosition }
  }),
)

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
  const item = pieces.value[index]
  offset.value.x = pos.x - item.x
  offset.value.y = pos.y - item.y
}

function onDrag(event: TouchEvent | MouseEvent) {
  if (draggingIndex.value === null) return
  const pos = getEventPosition(event)
  const item = pieces.value[draggingIndex.value]
  item.x = pos.x - offset.value.x
  item.y = pos.y - offset.value.y
  currentPos.value = pos
}

const onEndAction = (droppedItem: { row: number; col: number }) => {
  const el = document.getElementById(`${droppedItem.row}/${droppedItem.col}`)
  if (el) {
    const rect = el.getBoundingClientRect()
    const x = rect.left + rect.width
    const y = rect.top + rect.height
    const gridSection = getSectionFromScreenPoint(x, y)

    if (gridSection && gridSection.index === draggingIndex.value) {
      removePuzzleFromUserCollection()
      addSolvedPuzzleId(droppedItem.row, droppedItem.col)
    }
  }
}

function endDrag(onEnd: (item: any) => void) {
  if (draggingIndex.value !== null) {
    const droppedItem = pieces.value[draggingIndex.value]

    onEnd(droppedItem)
  }
  draggingIndex.value = null
}
</script>

<style scoped lang="scss">
.puzzle-frame {
  width: 1820px;
  height: 1820px;
  margin: 0 auto;
  position: relative;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 60px;
  overflow: hidden;

  .puzzle-image {
    width: 100%;
    height: 100%;
    opacity: 0.25;
    padding: 40px;
  }

  .puzzle-grid {
    // display: none;
    z-index: 5;
    position: absolute;
    user-select: none;
    inset: 40px;
    border-radius: 60px;
    // filter: contrast(200%) brightness(200%);
  }
}

.puzzle-pieces {
  height: 100%;
  z-index: 6;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 40px;
}
</style>
