import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Habitat, Memorial, Preview, Redbook, Sight, SightPreview } from './types'
import { useFetch } from '@/stores/useFetch'

export const useSightStore = defineStore('sight-store', () => {
    const store = useFetch<SightPreview, Sight>('landmark')
    const religionData = computed(() => store.data.value.filter((item) => item.type === 'religion'))
    const museumData = computed(() => store.data.value.filter((item) => item.type === 'museum'))
    const naturePlaceData = computed(() => store.data.value.filter((item) => item.type === 'naturePlace'))
    return {
        ...store,
        religionData,
        museumData,
        naturePlaceData,
    }
})
