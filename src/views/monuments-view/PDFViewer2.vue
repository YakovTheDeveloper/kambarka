<template>
  <iframe :src="pdfViewerUrl2" width="100%" height="100%" style="border: none"></iframe>
</template>

<script setup>
const props = defineProps({
  pdfUrl: { type: String, required: true },
})

const pdfViewerUrl2 = `/pdfjs/web/viewer.html?file=/1.pdf&spreadMode=1`

console.log(`output->pdfViewerUrl2`, pdfViewerUrl2)
</script>
