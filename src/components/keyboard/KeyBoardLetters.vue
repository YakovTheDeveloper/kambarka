<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import styles from './KeyBoardLetters.module.scss';
import { keys, keysNumber } from './model/modele';
import Icon from '@/components/keyboard/ui/Icon/Icon.vue';
// import Icon from '@/components/keyboard/ui/Icon/Icon.vue';


const props = defineProps<{
  inputRef?: HTMLInputElement | HTMLTextAreaElement | null;
  className?: string;
  keyBoardNumber?: boolean;
  maxValue?: number;
}>();

const emit = defineEmits<{
  (e: 'input-change', value: string): void;
  (e: 'visible'): void;
  (e: 'click-input'): void;
}>();

const internalValue = ref('');
const shiftMode = ref<'off' | 'once' | 'lock'>('off');
const internalInputRef = ref<HTMLInputElement | null>(null);


const onCloseButton = () => {
  emit('visible')
}
const updateCursor = () => {
  const targetInput = props.inputRef || internalInputRef.value;
  if (!targetInput) return;
  emit('click-input')
  return targetInput.selectionStart || 0;
};

const handleKeyPress = (key: string) => {
  console.log('props.inputRef', props.inputRef);
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
      emit('click-input')
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

  // console.log('00');
  emit('input-change', newValue)
};

watch(internalValue, () => {
  emit('click-input')
});

onMounted(() => {
  if (props.keyBoardNumber) {
    const initial = props.maxValue && props.maxValue > 2 ? '2' : '1';
    internalValue.value = initial;
    emit('input-change', initial);

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
  <div :class="[styles.keyBoardLetters, props.className]">

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
    <div @click="onCloseButton" :class="styles.keyBoardLetters__cross">
      <Icon name="cross_keyboard" />
    </div>
  </div>
</template>
