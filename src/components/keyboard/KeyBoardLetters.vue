<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import styles from './KeyBoardLetters.module.scss';
import { keys, keysNumber } from './model/modele';
import Icon from '@/components/keyboard/ui/Icon/Icon.vue';
// import Icon from '@/components/keyboard/ui/Icon/Icon.vue';

interface Props {
  inputRef?: HTMLInputElement | HTMLTextAreaElement | null;
  onInputChange?: (value: string) => void;
  onVisable?: () => void;
  clickInput?: () => void;
  className?: string;
  keyBoardNumber?: boolean;
  maxValue?: number;
}

const props = defineProps<Props>();

const internalValue = ref('');
const shiftMode = ref<'off' | 'once' | 'lock'>('off');
const internalInputRef = ref<HTMLInputElement | null>(null);

const updateCursor = () => {
  const targetInput = props.inputRef || internalInputRef.value;
  if (!targetInput) return;
  props.clickInput?.();
  return targetInput.selectionStart || 0;
};

const handleKeyPress = (key: string) => {
  const targetInput = props.inputRef || internalInputRef.value;
  if (!targetInput) return;

  targetInput.focus();

  let newValue = targetInput.value;
  const startPos = targetInput.selectionStart || 0;
  const endPos = targetInput.selectionEnd || 0;
  let newCursorPos = startPos;

  switch (key) {
    case 'backspace':
      if (startPos === endPos && startPos > 0) {
        newValue = newValue.slice(0, startPos - 1) + newValue.slice(startPos);
        newCursorPos = startPos - 1;
      } else if (startPos !== endPos) {
        newValue = newValue.slice(0, startPos) + newValue.slice(endPos);
        newCursorPos = startPos;
      }
      break;

    case 'Пробел':
      newValue = newValue.slice(0, startPos) + ' ' + newValue.slice(endPos);
      newCursorPos = startPos + 1;
      break;

    case 'Ввод':
      props.clickInput?.();
      return;

    case 'shift':
      shiftMode.value =
        shiftMode.value === 'off'
          ? 'once'
          : shiftMode.value === 'once'
            ? 'lock'
            : 'off';
      return;

    default:
      const char = shiftMode.value !== 'off' ? key.toUpperCase() : key;
      newValue = newValue.slice(0, startPos) + char + newValue.slice(endPos);
      newCursorPos = startPos + char.length;

      if (props.keyBoardNumber) {
        const numericVal = parseInt(newValue) || 1;
        if (numericVal > (props.maxValue || Infinity)) {
          newValue = String(props.maxValue);
          newCursorPos = newValue.length;
        }
      }
  }

  targetInput.value = newValue;
  internalValue.value = newValue;

  const event = new Event('input', { bubbles: true });
  targetInput.dispatchEvent(event);

  setTimeout(() => {
    targetInput.setSelectionRange(newCursorPos, newCursorPos);
  });

  props.onInputChange?.(newValue);
};

watch(internalValue, () => {
  props.clickInput?.();
});

onMounted(() => {
  if (props.keyBoardNumber) {
    const initial = props.maxValue && props.maxValue > 2 ? '2' : '1';
    internalValue.value = initial;
    props.onInputChange?.(initial);

    const targetInput = props.inputRef || internalInputRef.value;
    if (targetInput) targetInput.value = initial;
  }

  const targetInput = props.inputRef || internalInputRef.value;
  if (!targetInput) return;

  targetInput.addEventListener('click', updateCursor);
  targetInput.addEventListener('keyup', updateCursor);
});

onBeforeUnmount(() => {
  const targetInput = props.inputRef || internalInputRef.value;
  if (!targetInput) return;

  targetInput.removeEventListener('click', updateCursor);
  targetInput.removeEventListener('keyup', updateCursor);
});

const numericValue = () => parseInt(internalValue.value) || 1;
const isAtMin = () => numericValue() <= 1;
const isAtMax = () =>
  props.maxValue !== undefined && numericValue() >= props.maxValue;
</script>

<template>
  <div :class="[styles.keyBoardLetters, props.className]" @click="props.onVisable">
    <!-- Input Box for Internal Input -->
    <!-- <div v-if="!props.inputRef" class="keyboard-box" @click.stop>
      <button
        :class="[styles.keyBoardLetters__buttonPagination, isAtMin() && styles.keyBoardLetters__buttonPaginationVisible]"
        @click="() => {
          const input = internalInputRef;
          if (!input.value) return;
          const current = parseInt(input.value.value) || 0;
          const updated = Math.max(current - 1, 1);
          if (updated !== current) {
            input.value.value = String(updated);
            internalValue.value = String(updated);
            props.onInputChange?.(String(updated));
            input.value.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }">
        <img src="/icons/VectorLeft.svg" alt="" />
      </button>

      <input ref="internalInputRef" :value="internalValue" @input="e => {
        let val = parseInt((e.target as HTMLInputElement).value) || 1;
        if (val < 1) val = 1;
        if (props.maxValue && val > props.maxValue) val = props.maxValue;
        const strVal = String(val);
        internalValue.value = strVal;
        props.onInputChange?.(strVal);
      }" @click="updateCursor" @keyup="updateCursor" :class="styles.keyBoardLetters__keyboardInput" />

      <button 
        :class="[styles.keyBoardLetters__buttonPagination, isAtMax() && styles.keyBoardLetters__buttonPaginationVisible]"
        @click="() => {
          const input = internalInputRef;
          if (!input.value) return;
          const current = parseInt(input.value.value) || 0;
          const updated = Math.min(current + 1, props.maxValue || Infinity);
          if (updated !== current) {
            input.value.value = String(updated);
            internalValue.value = String(updated);
            props.onInputChange?.(String(updated));
            input.value.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }">
        <img src="/icons/VectorRight.svg" alt="" />
      </button>
    </div> -->

    <!-- Keyboard Layout -->
    <div @click.stop :class="[styles.keyBoardLetters__container, styles.keyBoardLetters__containerNumber]">
      <template v-if="!props.keyBoardNumber">
        <button v-for="(item, index) in keys" :key="index" :class="item.class
          .split(' ')
          .map(c => styles[`keyBoardLetters__${c}`])
          .join(' ')" @click="() => handleKeyPress(item.valueRUS)" @mousedown.prevent>
          <template v-if="item.icon === 'shift'">
            <Icon :name="shiftMode === 'lock' ? 'glyph2' : shiftMode === 'once' ? 'glyph' : 'shift'" />
          </template>
          <template v-else-if="item.icon">
            <Icon :name="item.icon" />
          </template>
          <template v-else-if="['Пробел', 'Ввод'].includes(item.valueRUS)">
            {{ item.valueRUS }}
          </template>
          <template v-else>
            {{ shiftMode !== 'off' ? item.valueRUS.toUpperCase() : item.valueRUS }}
          </template>
        </button>
      </template>

      <template v-else>
        <div :class="styles.keyBoardLetters__BoxNumber">
          <button v-for="(item, index) in keysNumber" :key="index" :class="item.class
            .split(' ')
            .map(c => styles[`keyBoardLetters__${c}`])
            .join(' ')" @click="() => handleKeyPress(item.valueRUS)" @mousedown.prevent>
            <template v-if="item.icon === 'shift'">
              <Icon :name="shiftMode === 'lock' ? 'glyph2' : shiftMode === 'once' ? 'glyph' : 'shift'" />
            </template>
            <template v-else-if="item.icon">
              <Icon :name="item.icon" />
            </template>
            <template v-else-if="['Пробел', 'Ввод'].includes(item.valueRUS)">
              {{ item.valueRUS }}
            </template>
            <template v-else>
              {{ shiftMode !== 'off' ? item.valueRUS.toUpperCase() : item.valueRUS }}
            </template>
          </button>
        </div>
      </template>
    </div>

    <!-- Close Cross -->
    <div @click="props.onVisable" :class="styles.keyBoardLetters__cross">
      <Icon name="cross_keyboard" />
    </div>
  </div>
</template>
