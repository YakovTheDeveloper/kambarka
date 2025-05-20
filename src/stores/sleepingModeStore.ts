// composables/useInactivityTimer.ts
import { onMounted, onUnmounted } from 'vue'

// stores/sleepingModeStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSleepingModeStore = defineStore('sleepingMode', () => {
    const isVisible = ref(false)

    const show = () => { isVisible.value = true }
    const hide = () => { isVisible.value = false }

    useInactivityTimer()

    return { isVisible, show, hide }
})

export function useInactivityTimer(timeout = 30000) {
    const sleepingStore = useSleepingModeStore()
    let timer: ReturnType<typeof setTimeout>

    const reset = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            sleepingStore.show()
        }, timeout)
    }

    const activityEvents = ['touchstart', 'mousemove', 'keydown']
    const handleActivity = () => {
        if (sleepingStore.isVisible) {
            // sleepingStore.hide()
        }
        reset()
    }

    onMounted(() => {
        activityEvents.forEach(evt => window.addEventListener(evt, handleActivity, { passive: true }))
        reset()
    })

    onUnmounted(() => {
        activityEvents.forEach(evt => window.removeEventListener(evt, handleActivity))
        clearTimeout(timer)
    })
}
