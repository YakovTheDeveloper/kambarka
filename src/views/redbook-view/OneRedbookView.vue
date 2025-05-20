<template>
    <div class="container-bg container-padding container-bg-blur-2">
        <Header title="Красная книга Камбарского района" />
        <div class="content">
            <Slider :photos="[
                { id: 1, src: '/images/games/memory/card.png', title: '13' },
                { id: 2, src: '/images/games/memory/card.png', title: '14' },
                { id: 3, src: '/images/games/memory/card.png', title: '15' },
            ]" />
            <div class="content-desc">
                <Space value="50" />
                <ItemDescription :items="store.routeIdData?.redBookInfo" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Slider from '@/components/slider/Slider.vue'
import Header from '../shared/header/Header.vue'
import ItemDescription from '../shared/item-description/ItemDescription.vue'
import Space from '@/components/space/Space.vue'
import { onMounted, ref, watchEffect } from 'vue'
import { useRedBookStore } from '@/stores/redbookStore'

const store = useRedBookStore()
onMounted(() => {
    store.fetchOne()
})

watchEffect(() => console.log(store.routeIdData))

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
