import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Habitat, Memorial, Preview, Redbook } from './types'
import { useFetch } from '@/stores/useFetch'

export const useGameStore = defineStore('game-store', () => {
    const puzzleImages = ref<{ id: number; image: string }[]>([])

    const fetchAll = async () => {
        try {
            const response = await axios.get('http://api-kambarka-nature.test.itlabs.top/api/puzzle', {
                headers: { accept: 'application/json' }
            })
            puzzleImages.value = response.data
        } catch (error) {
            console.error('Failed to fetch puzzle images:', error)
        }
    }

    return {
        puzzleImages,
        fetchAll
    }
})
