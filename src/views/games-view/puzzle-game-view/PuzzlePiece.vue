<template>
  <div class="puzzle-piece" :style="pieceStyle"></div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  row: Number, // 0 to 5
  col: Number, // 0 to 5
  gridSize: Number, // 6
  imageUrl: String, // full image URL
  shapeIndex: Number, // from 1 to 36
  backgroundPosition: String,
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

// Fixed puzzle size
const totalSize = 1740
const pieceSize = totalSize / props.gridSize // 290
const pieceStyle = computed(() => {
  return {
    width: `${imgWidth.value}px`,
    height: `${imgHeight.value}px`,
    backgroundImage: `url(${props.imageUrl})`,
    backgroundSize: `${totalSize}px ${totalSize}px`,
    backgroundPosition: props.backgroundPosition,
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    userSelect: 'none',
    boxSizing: 'border-box',
    // Optional: Add border for visibility
    border: '1px solid #ccc',
    boxShadow: '0 0 0 5px white',
    maskImage: `url(${maskUrl})`,
    WebkitMaskImage: `url(${maskUrl})`,
    // maskSize: 'cover',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    // maskPosition: 'top left',
  }
})
</script>

<style scoped>
.puzzle-piece {
  z-index: 10;
  display: inline-block;
  /* opacity: 0.1; */
}
</style>
