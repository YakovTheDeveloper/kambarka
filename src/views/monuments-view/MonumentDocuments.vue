<template>
  <div class="modal container-padding">
    <button class="modal-close-btn" @click="onClose">
      <CrossIcon />
    </button>
    <div class="docs">
      <PDFViewer
        ref="pdfReaderRef"
        v-if="media?.type === 'document' && content.media"
        :url="getServerImageMemorialUrl(content.media)"
      />
    </div>

    <div class="page-select" v-if="showPageSelect">
      <div class="row" v-if="pdfReaderRef">
        <button
          class="navigation-prev"
          @click="pdfReaderRef?.handlePrev"
          :disabled="pdfReaderRef.currentPage <= 1"
        >
          <ArrowLeftNavIcon />
        </button>
        <input type="number" v-model="inputValue" />
        <button
          class="navigation-next"
          @click="pdfReaderRef?.handleNext"
          :disabled="pdfReaderRef.currentPage + 1 > pdfReaderRef.numPages"
        >
          <ArrowRightNavIcon />
        </button>
      </div>
      <div class="page-select-keyboard-container">
        <div class="page-select-keyboard">
          <button v-for="key in keyboardKeys" :key="key" @click="appendToInput(key)">
            {{ key }}
          </button>
          <button class="page-select-keyboard__backspace" @click="backspace">
            <BackspaceIcon />
          </button>
          <button @click="appendToInput('0')">0</button>
          <button class="page-select-keyboard__enter" @click="submitInput">Ввод</button>
        </div>
      </div>
      <div class="page-select-close" @click="showPageSelect = false">
        <CrossRoundIcon />
      </div>
    </div>
    <div
      class="navigation"
      v-else-if="media?.type === 'document' && pdfReaderRef && pdfReaderRef.numPages > 2"
    >
      <button
        class="navigation-prev"
        @click="pdfReaderRef?.handlePrev"
        :disabled="pdfReaderRef.currentPage <= 1"
      >
        <ArrowLeftNavIcon />
      </button>
      <button class="navigation-current-page" @click="showPageSelect = true">
        Страницы {{ pdfReaderRef.currentPage }}
        {{
          pdfReaderRef.currentPage + 1 <= pdfReaderRef.numPages
            ? ` – ${pdfReaderRef.currentPage + 1}`
            : ''
        }}
        / {{ pdfReaderRef.numPages }}
      </button>
      <button
        class="navigation-next"
        @click="pdfReaderRef?.handleNext"
        :disabled="pdfReaderRef.currentPage + 1 > pdfReaderRef.numPages"
      >
        <ArrowRightNavIcon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import ArrowLeftNavIcon from '@/components/icons/ArrowLeftNavIcon.vue'
import ArrowRightNavIcon from '@/components/icons/ArrowRightNavIcon.vue'
import BackspaceIcon from '@/components/icons/BackspaceIcon.vue'
import CrossIcon from '@/components/icons/CrossIcon.vue'
import CrossRoundIcon from '@/components/icons/CrossRoundIcon.vue'
import PDFViewer from './PDFViewer.vue'
import { getServerImageMemorialUrl, getServerImageUrl } from '@/utils/getServerImageUrl'
import { getFileTypeFromUrl } from '@/utils/getFileTypeFromUrl'

const props = defineProps<{
  onClose: VoidFunction
  content: { id: number; media: string }
}>()

const currentPdfLink = computed(() =>
  props.content?.media ? getServerImageUrl(props.content?.media) : '',
)

const media = computed(() => {
  if (!props.content) return null
  return { ...props.content, type: getFileTypeFromUrl(props.content.media) }
})

const pdfReaderRef = ref<{
  handleKeyboardInput: (val: string) => void
  handlePrev: () => void
  handleNext: () => void
  numPages: number
  currentPage: number
}>()

watchEffect(() => {
  console.log(`output->currentPdfLink`, currentPdfLink.value)
  console.log(`output->media`, media.value)
})

const keyboardKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const inputValue = ref('')

const appendToInput = (key: string) => {
  inputValue.value += key
}

const backspace = () => {
  inputValue.value = inputValue.value.slice(0, -1)
}

const submitInput = () => {
  pdfReaderRef.value?.handleKeyboardInput(inputValue.value)
  inputValue.value = ''
}

const showPageSelect = ref(false)
</script>

<style scoped lang="scss">
.modal {
  inset: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  width: 3840px;
  height: 2160px;
  overflow: hidden;

  &-close-btn {
    position: absolute;
    top: 80px;
    right: 80px;
    width: 128px;
    height: 128px;
    color: #4fa127;
    border-radius: 50%;
    background-color: white;
  }
}
.docs {
  width: 2502px;
  height: 1792px;
  // display: grid;
  // grid-template-columns: repeat(2, 1256px);
  // grid-template-rows: 1792px;
  gap: 48px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  * {
    background-color: #7c7373;
    border-radius: 60px;
  }
}
.navigation {
  position: absolute;
  display: flex;
  gap: 40px;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);

  &-current-page {
    font-weight: 600;
    font-size: 48px;
    color: #fff;
    padding: 50px 90px;
    border-radius: 60px;
    background-color: #7c7373;
  }

  &-next,
  &-prev {
    width: 270px;
    height: 160px;
    flex-shrink: 0;
    border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4fa127;
  }

  button {
    &:disabled {
      background-color: #fff;
      opacity: 0.2;
    }
  }
}

.page-select {
  width: 1200px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  &:after {
    height: 1040px;
    width: 5040px;
    left: -1900px;
    bottom: -80px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    position: absolute;
    content: '';
    z-index: -1;
  }

  button {
    background-color: #fff;
    &:disabled {
      background-color: #fff;
      opacity: 0.2;
    }
  }

  .row {
    gap: 40px;

    input {
      width: 580px;
      flex-grow: 1;
      outline: 8px solid #4fa127;
      border-radius: 60px;
      font-size: 48px;
      font-weight: 600;
      color: #323232;
      padding: 50px;
      text-align: center;
      caret-color: #323232;

      :focus {
        caret-color: #323232;
      }

      -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &-keyboard {
    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 48px;
      background-color: #fff;
      border-radius: 60px;
    }
    display: grid;
    grid-template-columns: repeat(3, 208px);
    grid-template-rows: repeat(4, 96px);
    gap: 16px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      box-shadow: 0px 1px 0px rgba(28, 114, 34, 0.4);
      border-radius: 16px;

      font-weight: 500;
      font-size: 36px;
      color: #323232;

      &:active {
        opacity: 0.3;
      }

      &.page-select-keyboard__enter {
        background-color: rgba(79, 161, 39, 1);
        color: #fff;
      }

      &.page-select-keyboard__backspace {
        background-color: rgba(79, 161, 39, 0.2);
      }
    }
  }

  &-close {
    width: 580px;
    height: 112px;
    padding: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 56px;
  }
}
</style>
