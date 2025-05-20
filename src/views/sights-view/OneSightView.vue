<template>
    <div class="container-bg container-padding container-bg-blur-2">
        <Header title="Достопримечательности района" />
        <div class="content">
            <Slider :photos="store.routeIdData?.image || []" :title="store.routeIdData?.title" />
            <div class="content-desc">
                <Space value="50" />
                <ItemDescription :items="textContent || []" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Slider from '@/components/slider/Slider.vue'
import Header from '../shared/header/Header.vue'
import ItemDescription from '../shared/item-description/ItemDescription.vue'
import Space from '@/components/space/Space.vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRedBookStore } from '@/stores/redbookStore'
import { useSightStore } from '@/stores/sightStore'

const store = useSightStore()
onMounted(() => {
    store.fetchOne()
})

watchEffect(() => console.log(store.routeIdData))

const textContent = computed(() => {
    if (!store.routeIdData) return []
    const { type, history = '', simpleName = '', description = '', place = '', name = '', nowadays = '', status = '' } = store.routeIdData
    return [
        {
            id: 1,
            title: 'Название',
            description: name
        },
        {
            id: 2,
            title: 'Обиходные названия',
            description: simpleName
        },
        {
            id: 3,
            title: 'Статус',
            description: status
        },
        {
            id: 4,
            title: 'Историческое исповедание',
            description: history
        },
        {
            id: 5,
            title: 'Современная принадлежность',
            description: nowadays
        },
    ]
})

</script>

<style scoped lang="scss">
.content {
    display: flex;

    &-desc {
        flex-grow: 1;
    }
}

.additional-item {
    padding: 24px;
    gap: 24px;
    display: flex;
    align-items: center;
    border-radius: 24px;
    background-color: rgba(79, 161, 39, 0.8);
    font-weight: 600;
    font-size: 48px;
    color: #fff;
    margin-bottom: 24px;
}
</style>
