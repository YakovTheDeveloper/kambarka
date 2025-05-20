<template>
  <div class="puzzle-piece" :style="pieceStyle"></div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  row: Number,
  col: Number,
  size: Number,
  imageUrl: String,
  gridSize: Number,
  shapeIndex: Number, // from 1 to 36
})

const imgWidth = ref(0)
const imgHeight = ref(0)
const maskUrl = `/images/games/puzzle/puzzle_piece-${props.shapeIndex}.png`

onMounted(() => {
  const img = new Image()
  img.src = maskUrl
  img.onload = () => {
    imgWidth.value = img.naturalWidth
    imgHeight.value = img.naturalHeight
  }
})

const pieceStyle = computed(() => {
  const bgSize = `${props.gridSize * 100}%` // e.g. 600%
  const bgPosX = `${(props.col / (props.gridSize - 0.3)) * 100}%`
  const bgPosY = `${(props.row / props.gridSize) * 100}%`

  const maskUrl = `/images/games/puzzle/puzzle_piece-${props.shapeIndex}.png`

  return {
    width: `${imgWidth.value}px`,
    height: `${imgHeight.value}px`,
    backgroundImage: `url(${props.imageUrl})`,
    backgroundSize: bgSize,
    backgroundPosition: `${bgPosX} ${bgPosY}`,
    boxSizing: 'border-box',
    cursor: 'pointer',
    userSelect: 'none',

    // Use mask-image to shape the puzzle piece by your shape image
    maskImage: `url(${maskUrl})`,
    WebkitMaskImage: `url(${maskUrl})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',

    border: '1px solid transparent', // optional: remove border or keep
  }
})
</script>

<style scoped>
.puzzle-piece {
  display: inline-block;
  /* If you want border around the piece */
  /* border: 1px solid #ccc; */
}
</style>
