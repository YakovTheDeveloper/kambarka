<template>
  <div :style="{ height: '100%' }">
    <div class="toolbar">
      <button @click="prevSpread" :disabled="pageNum <= 1">⬅ Prev</button>
      <span
        >Pages {{ pageNum }} - {{ pageNum + 1 <= pageCount ? pageNum + 1 : pageCount }} /
        {{ pageCount }}</span
      >
      <button @click="nextSpread" :disabled="pageNum + 1 >= pageCount">Next ➡</button>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min?url'

GlobalWorkerOptions.workerSrc = pdfjsWorker

const props = defineProps({
  pdfUrl: { type: String, required: true },
})

const canvas = ref(null)
const pageNum = ref(1)
const pageCount = ref(0)
let pdfDoc = null

const renderSpread = async (leftPageNum) => {
  const leftPage = await pdfDoc.getPage(leftPageNum)
  const rightPageNum = leftPageNum + 1
  const hasRight = rightPageNum <= pageCount.value
  const rightPage = hasRight ? await pdfDoc.getPage(rightPageNum) : null

  const scale = 1.5
  const leftViewport = leftPage.getViewport({ scale })
  const rightViewport = rightPage ? rightPage.getViewport({ scale }) : null

  const totalWidth = leftViewport.width + (rightViewport?.width || 0)
  const maxHeight = Math.max(leftViewport.height, rightViewport?.height || 0)

  const ctx = canvas.value.getContext('2d')
  canvas.value.width = totalWidth
  canvas.value.height = maxHeight

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Render left page
  ctx.save()
  ctx.translate(0, 0)
  await leftPage.render({
    canvasContext: ctx,
    viewport: leftViewport,
  }).promise
  ctx.restore()

  // Render right page
  if (rightPage) {
    ctx.save()
    ctx.translate(leftViewport.width, 0)
    await rightPage.render({
      canvasContext: ctx,
      viewport: rightViewport,
    }).promise
    ctx.restore()
  }
}

const nextSpread = () => {
  if (pageNum.value + 1 < pageCount.value) {
    pageNum.value += 2
    renderSpread(pageNum.value)
  }
}

const prevSpread = () => {
  if (pageNum.value > 2) {
    pageNum.value -= 2
  } else {
    pageNum.value = 1
  }
  renderSpread(pageNum.value)
}

onMounted(async () => {
  const loadingTask = getDocument('/1.pdf')
  pdfDoc = await loadingTask.promise
  pageCount.value = pdfDoc.numPages
  renderSpread(pageNum.value)
})
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}
canvas {
  border: 1px solid #ccc;
  display: block;
  margin: auto;
}
</style>
