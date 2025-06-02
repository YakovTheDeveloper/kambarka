<template>
  <div class="page-select" v-if="showPageSelect">
    <div class="row">
      <button class="navigation-prev" @click="handlePrev" :disabled="currentPage <= 1">
        <ArrowLeftNavIcon />
      </button>
      <input type="number" v-model="inputValue" />
      <button class="navigation-next" :disabled="currentPage + 1 > numPages" @click="handleNext">
        <ArrowRightNavIcon />
      </button>
    </div>
    <div class="page-select-keyboard-container">
      <div class="page-select-keyboard">
        <button v-for="key in keyboardKeys" :key="key" @click="appendToInput(key)">
          {{ key }}
        </button>
        <button class="page-select-keyboard__backspace" @click="backspace">
          <BackspaceIcon width="72px" />
        </button>
        <button @click="appendToInput('0')">0</button>
        <button class="page-select-keyboard__enter" @click="submitInput">Ввод</button>
      </div>
    </div>
    <div class="page-select-close" @click="showPageSelect = false">
      <CrossRoundIcon />
    </div>
  </div>
  <div class="navigation" v-else>
    <button class="navigation-prev" @click="handlePrev" :disabled="currentPage <= 1">
      <ArrowLeftNavIcon />
    </button>
    <button class="navigation-current-page" @click="onPageNav">
      Страницы {{ currentPage }}
      <template v-if="currentPage + 1 <= numPages"> – {{ currentPage + 1 }} </template>
      / {{ numPages }}
    </button>
    <button class="navigation-next" :disabled="currentPage + 1 > numPages" @click="handleNext">
      <ArrowRightNavIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArrowLeftNavIcon from '@/components/icons/ArrowLeftNavIcon.vue'
import ArrowRightNavIcon from '@/components/icons/ArrowRightNavIcon.vue'
import BackspaceIcon from '@/components/icons/BackspaceIcon.vue'
import CrossRoundIcon from '@/components/icons/CrossRoundIcon.vue'
const props = defineProps<{
  currentPage: number
  numPages: number
  handlePrev: VoidFunction
  handleNext: VoidFunction
  handleKeyboardInput: (text: string) => void
}>()
const onPageNav = () => {
  showPageSelect.value = true
  props.handlePrev()
}
const keyboardKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const inputValue = ref('')

const appendToInput = (key: string) => {
  inputValue.value += key
}

const backspace = () => {
  inputValue.value = inputValue.value.slice(0, -1)
}

const submitInput = () => {
  props.handleKeyboardInput(inputValue.value)
}

const showPageSelect = ref(false)
</script>
<style lang="scss" scoped>
button {
  &:disabled {
    background-color: #fff;
    opacity: 0.2;
  }
}

.navigation {
  display: flex;
  gap: 40px;

  &-current-page {
    font-weight: 600;
    font-size: 48px;
    color: #fff;
    padding: 50px 90px;
    border-radius: 60px;
    background-color: #7c7373;
    width: 900px;
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
}

.page-select {
  width: 1200px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -210px;
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

  &-close {
    background-color: #fff;
    border-radius: 56px;
    padding: 32px;
    width: 580px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
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
}
</style>
