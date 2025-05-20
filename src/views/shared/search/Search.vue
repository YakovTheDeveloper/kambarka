<template>
    <div class="search">
        <SearchIcon class="search-icon" />
        <input v-model="query" @input="onInput" type="text" placeholder="Поиск" class="search-input" />


    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'

const props = defineProps<{
    value: string
}>()

const query = ref(props.value)
const emit = defineEmits<{
    (e: 'change', value: string): void
}>()

function onInput() {
    emit('change', query.value)
}

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
    font-weight: 600;
    font-size: 48px;
    line-height: 100%;
    color: rgba(79, 161, 39, 1);

    &::placeholder {
        color: rgba(79, 161, 39, 1);
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