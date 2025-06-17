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
          :draggable="false"
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
import { computed, nextTick, onMounted, ref, watchEffect, type Ref } from 'vue'
import { usePuzzleSections } from './composables/PuzzleSections'
import { initPuzzlePositions, pos } from './data'
import { useMovable } from './composables/useMovable'
import { useGameStore } from '@/stores/gameStore'
import { useGetDifficulty } from '@/views/games-view/composables/useGetDifficulty'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import { useRouter } from 'vue-router'

const puzzlesToOpen = ref<Record<string, boolean>>({})
const puzzlesIds = computed(() => Object.keys(puzzlesToOpen.value))

const addSolvedPuzzleId = (row: number, col: number) => {
  puzzlesToOpen.value = {
    ...puzzlesToOpen.value,
    [getGridItemId(row, col)]: true,
  }
}
const router = useRouter()
const gridSize = 6
const pieceSize = 320
const store = useGameStore()
const difficulty = useGetDifficulty()
const baseImage = computed(() => {
  return getServerImageUrl(store.puzzleImages[difficulty.difficulty.value - 1]?.image)
})
watchEffect(() => console.log(baseImage.value))
const gridImage = '/images/games/puzzle/grid.svg'
const puzzleImageRef = ref()

const { updateSectionsFromElement, getSectionFromScreenPoint } = usePuzzleSections()
const getGridItemId = (x, y) => {
  return `${x}/${y}`
}
onMounted(() => {
  nextTick(() => {
    updateSectionsFromElement(puzzleImageRef.value)
  })
})

function handleClick(e) {
  const section = getSectionFromScreenPoint(e.clientX, e.clientY)
  console.log('Clicked section:', section)
}

const pieces = ref(
  Array.from({ length: gridSize * gridSize }, (_, index) => {
    const row = Math.floor(index / gridSize)
    const col = index % gridSize
    const { backgroundPosition } = pos[index]

    return {
      row,
      col,
      x: initPuzzlePositions[index].x,
      y: initPuzzlePositions[index].y,
      show: true,
      backgroundPosition,
    }
  }),
)

const removePuzzleFromUserCollection = (draggingIndex: Ref<number>) => {
  pieces.value = pieces.value.map((item, index) => {
    if (index === draggingIndex.value) {
      return { ...item, show: false }
    }
    return item
  })
}

watchEffect(() => {
  if (Object.keys(puzzlesToOpen.value).length === pieces.value.length) {
    router.push(`/games/puzzle/finish?difficulty=${difficulty.difficulty.value}`)
  }
})

// const removePuzzleFromUserCollection = (draggingIndex: Ref<number>,x:number,y:number) => {
//   pieces.value = pieces.value.map((item, index) => {
//     if (index === draggingIndex.value) {
//       return { ...item, show: false }
//     }
//     return item
//   })
// }

const onDragEndAction = (draggingIndex: Ref<number>, droppedItem: { row: number; col: number }) => {
  const el = document.getElementById(`${droppedItem.row}/${droppedItem.col}`)
  if (el) {
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    // const x = rect.left + rect.width
    // const y = rect.top + rect.height
    const gridSection = getSectionFromScreenPoint(centerX, centerY)

    const x = rect.left
    const y = rect.top
    const itemSize = 100 // updated item size

    if (x < itemSize || y < itemSize || x + itemSize > 3840 || y + itemSize > 2160) {
      console.log(`Item is out of screen: x=${x}, y=${y}`)
      const idx = draggingIndex.value
      pieces.value[idx].x = initPuzzlePositions[idx].x
      pieces.value[idx].y = initPuzzlePositions[idx].y
    }

    console.log(`output->gridSection`, gridSection)

    if (gridSection && gridSection.index === draggingIndex.value) {
      removePuzzleFromUserCollection(draggingIndex)
      addSolvedPuzzleId(droppedItem.row, droppedItem.col)
    }
  }
}
const { endDrag, onDrag, startDrag } = useMovable({
  items: pieces,
  onDragEndAction,
})
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
    user-select: none;
    object-fit: cover;
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
