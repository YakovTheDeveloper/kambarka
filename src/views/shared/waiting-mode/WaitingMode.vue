<!-- components/WaitingModal.vue -->
<template>
    <div v-if="isVisible" class="waiting-modal" @click.stop="sleepingStore.hide">
        <div class="modal-content">
            <div class="countdown">{{ countdownValue }}</div>
            <Space value="64" />
            <h1 class="title">Завершение сеанса</h1>
            <Space value="64" />
            <p>Из-за отсутствия активности программа скоро вернётся в главное меню</p>
            <Space value="32" />
            <p class="caption">Вы можете нажать в любое место экрана, чтобы возобновить работу</p>
            <Space value="64" />
            <div class="actions">
                <button class="button" @click="sleepingStore.hide">Продолжить</button>
                <button class="button button_secondary" @click="sleepingStore.hide(); router.push('/')">На
                    главную</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSleepingModeStore } from '@/stores/sleepingModeStore'
import { storeToRefs } from 'pinia'
import Space from '@/components/space/Space.vue'


// Store
const sleepingStore = useSleepingModeStore()
const { isVisible } = storeToRefs(sleepingStore)

// Router
const router = useRouter()

// Countdown state
const countdownValue = ref(30)
let interval: ReturnType<typeof setInterval> | null = null

const startCountdown = () => {
    countdownValue.value = sleepingStore.config?.notificationSeconds || 30
    interval = setInterval(() => {
        countdownValue.value--
        if (countdownValue.value <= 0) {
            clearCountdown()
            sleepingStore.hide()
            router.push({ name: 'home' }) // Or { path: '/' }
        }
    }, 1000)
}

const clearCountdown = () => {
    if (interval) clearInterval(interval)
    interval = null
}

// Tap or interaction cancels waiting mode
const hide = () => {
    clearCountdown()
    sleepingStore.hide()
}

// Watch modal visibility
watch(isVisible, (newVal) => {
    if (newVal) {
        startCountdown()
    } else {
        clearCountdown()
    }
})

watch(sleepingStore.config, (config) => {
    if (config) {

    } else {

    }
})



onUnmounted(() => {
    clearCountdown()
})
</script>


<style scoped lang="scss">
.waiting-modal {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

.modal-content {
    width: 1200px;
    height: 1011px;
    gap: 64px;
    border-radius: 64px;
    padding: 64px;
    color: rgba(50, 50, 50, 1);
    font-weight: 400;
    font-size: 48px;
    line-height: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, 1);


}

.countdown {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 120px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    color: rgba(79, 161, 39, 1);

    width: 248px;
    height: 248px;
    margin: 0 auto;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('/images/misc/spinner.svg') center center no-repeat;
        background-size: contain;
        box-sizing: border-box;
        animation: countdown-spin 1.5s linear infinite;
    }

    @keyframes countdown-spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}



.title {
    font-weight: 700;
    font-size: 80px;
    line-height: 100%;
}

.caption {
    font-weight: 600;
    font-size: 40px;
    line-height: 100%;
    text-align: center;
    opacity: 0.35;
}

.actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    .button {
        font-weight: 600;
        font-size: 48px;
        line-height: 100%;
        text-align: center;
        padding: 48px;
        border: 6px solid rgba(79, 161, 39, 1);
        border-radius: 40px;
        background-color: rgba(79, 161, 39, 1);
        color: rgba(255, 255, 255, 1);

        &_secondary {
            background-color: transparent;
            color: rgba(79, 161, 39, 1);
        }
    }



}
</style>
