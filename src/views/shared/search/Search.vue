<template>
    <div class="search">
        <SearchIcon class="search-icon" />
        <input ref="input" v-model="query" @input="onInput" type="text" placeholder="Поиск" class="search-input"
            @focus="isKeyboardShow = true" />
        <button v-show="query" class="search-clear-button" @click="onClear">
            <CrossIcon />
        </button>
        <Teleport to="#app">
            <KeyBoardLetters v-if="isKeyboardShow" :input-ref="input" @input-change="onChange" @click-input="onFocus"
                @visible="hideKeyboard" />
        </Teleport>

    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed, watch, Teleport } from 'vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import CrossIcon from '@/components/icons/CrossIcon.vue';
import KeyBoardLetters from '@/components/keyboard/KeyBoardLetters.vue';

const props = defineProps<{
    value: string
}>()

const isKeyboardShow = ref(false)
const onFocus = () => {
    input?.value?.focus()
}

const query = ref(props.value)
const input = ref()
watch(() => props.value, (newVal) => {
    query.value = newVal
})

const emit = defineEmits<{
    (e: 'change', value: string): void
    (e: 'clear'): void
}>()

function onChange(value: string) {
    emit('change', value)
}

function onInput() {
    emit('change', query.value)
}

function onClear() {
    query.value = ''
    emit('clear')
}

function hideKeyboard() {
    isKeyboardShow.value = false
}

defineExpose({
    inputRef: input
})


</script>

<style scoped lang="scss">
.search {
    display: flex;
    align-items: center;
    padding: 50px 50px 50px 150px;
    border-radius: 60px;
    background-color: rgba(255, 255, 255, 1);
    position: relative;
    width: 883px;
    border: 8px solid transparent;

    &:focus-within {
        border-color: rgba(79, 161, 39, 1);
    }

    &-clear-button {
        background-color: transparent;
    }

    &-icon {
        position: absolute;
        bottom: 50%;
        transform: translateY(50%);
        left: 48px;
    }
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 48px;
    line-height: 100%;
    color: #323232;

    font-weight: 400; // color: rgba(79, 161, 39, 1);

    &::placeholder {
        font-weight: 600;
    }

}

.search-btn {
    background: #f5f5f5;
    border: 1px solid #ccc;
    border-left: none;
    border-radius: 0 4px 4px 0;
    padding: 0.5em 1em;
    cursor: pointer;
    display: flex;
    align-items: center;
}
</style>