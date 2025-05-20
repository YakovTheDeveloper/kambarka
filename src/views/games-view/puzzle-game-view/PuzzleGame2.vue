<template>
  <div>
    <img src="/images/games/puzzle/mock.png" alt="" ref="puzzleImageRef" />
  </div>
</template>

<script setup lang="ts">
const puzzleMaskImgs = new Array(36)
  .fill(' ')
  .map((el, i) => `/images/games/puzzle/puzzle_piece-${i + 1}.png`)

console.log(`output->puzzleMaskImgs`, puzzleMaskImgs)
</script>

<style scoped></style>
