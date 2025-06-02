<template>
    <div class="image-content">
        <img :src="getServerImageUrl(src)" alt="">
    </div>
</template>

<script setup lang="ts">
import { getServerImageUrl } from '@/utils/getServerImageUrl';

defineProps<{ src: string }>()
</script>

<style lang="scss" scoped>
.image-content {
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>