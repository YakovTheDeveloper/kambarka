<template>
  <div :class="styles.pdfViewer">
    <div :class="[styles.viewer, numPages >= 3 ? styles.multiPage : '']" @click.stop>
      <canvas ref="canvasRef1" :class="[styles.canvas, numPages >= 3 ? styles.canvasMore : '']" />
      <canvas ref="canvasRef2" :class="[styles.canvas, numPages >= 3 ? styles.canvasMore : '']" />
    </div>

    <div v-if="numPages > 2" :class="styles.pdfViewer__pagination" @click.stop>
      <PageSelect :handleKeyboardInput="handleKeyboardInput" :handlePrev="handlePrev" :handleNext="handleNext"
        :numPages="numPages" :currentPage="currentPage" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted, shallowRef } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

import styles from './PdfClass.module.scss'
import { getMonumentServerImageUrl } from '@/utils/getServerImageUrl';
import PageSelect from '@/views/monuments-view/PageSelect/PageSelect.vue';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
const props = defineProps<{
  url: string
}>()

const canvasRef1 = ref<HTMLCanvasElement | null>(null)
const canvasRef2 = ref<HTMLCanvasElement | null>(null)

const pdfDoc = shallowRef<any>(null)
const currentPage = ref(1)
const numPages = ref(0)
const error = ref<string | null>(null)
const showKeyBoard = ref(false)

async function loadPdf(url: string) {
  console.log('wtff')
  try {
    error.value = null
    currentPage.value = 1

    const response = await fetch(url)
    if (!response.ok) throw new Error('Ошибка загрузки PDF')

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const loadingTask = pdfjsLib.getDocument(blobUrl)
    const pdf = await loadingTask.promise
    pdfDoc.value = pdf
    numPages.value = pdf.numPages

    URL.revokeObjectURL(blobUrl)
  } catch (err) {
    console.error('Ошибка загрузки PDF:', err)
    error.value = 'Не удалось загрузить PDF.'
  }
}

async function renderPage(pageNum: number, canvasRef: typeof canvasRef1) {
  if (!canvasRef.value || !pdfDoc.value || pageNum > numPages.value) return

  const page = await pdfDoc.value.getPage(pageNum)
  const viewport = page.getViewport({ scale: 1.5 })
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')

  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({ canvasContext: context!, viewport }).promise
}

async function renderPages() {
  if (!pdfDoc.value) return

  await renderPage(currentPage.value, canvasRef1)

  if (currentPage.value + 1 <= numPages.value) {
    await renderPage(currentPage.value + 1, canvasRef2)
    if (canvasRef2.value) canvasRef2.value.style.display = 'block'
  } else if (canvasRef2.value) {
    canvasRef2.value.style.display = 'none'
  }
}

function handlePrev() {
  currentPage.value = Math.max(currentPage.value - 2, 1)
}

function handleNext() {
  currentPage.value = Math.min(currentPage.value + 2, numPages.value)
}

function handleKeyboardInput(val: string) {
  const page = Number(val)
  if (!isNaN(page) && page >= 1 && page <= numPages.value) {
    currentPage.value = page % 2 === 0 ? page - 1 : page
  }
}

watch(() => currentPage.value, renderPages)
watch(() => pdfDoc.value, renderPages)

onMounted(() => {
  loadPdf(getMonumentServerImageUrl(props.url))
})
</script>
