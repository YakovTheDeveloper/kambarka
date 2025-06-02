<template>
    <button class="button" @click="router.push(to)" :style="{ borderRadius: '60px' }">
        <BackButtonIcon />
    </button>
</template>

<script setup lang="ts">
import BackButtonIcon from '@/components/BackButtonIcon.vue';
import router from '@/router';
defineProps<{
    to: string
}>()

</script>

<style scoped></style>