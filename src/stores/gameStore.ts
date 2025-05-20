import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Habitat, Memorial, MemoryGameData, Preview, Redbook } from './types'
import { useFetch } from '@/stores/useFetch'
import { loadImages } from '@/utils/loadImages'

export const useGameStore = defineStore('game-store', () => {
    const puzzleImages = ref<{ id: number; image: string }[]>([])

    const memoryDifficultyToImages = ref<{
        1: MemoryGameData | null
        2: MemoryGameData | null
        3: MemoryGameData | null
    }>({
        1: null,
        2: null,
        3: null
    })

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


    const fetchMemory = async (level: number) => {
        const difficultyToQuery = {
            1: 'novice',
            2: 'advanced',
            3: 'professional',
        }
        try {
            const response = await axios.get(`http://api-kambarka-nature.test.itlabs.top/api/memory?level=${difficultyToQuery[level]}`, {
                headers: { accept: 'application/json' }
            })
            const data = response.data as MemoryGameData
            if (data) {
                loadImages(data.memoryImages)
                memoryDifficultyToImages.value = { ...memoryDifficultyToImages.value, [level]: response.data }
            }
        } catch (error) {
            console.error('Failed to fetch memory data:', error)
        }
    }

    return {
        puzzleImages,
        memoryDifficultyToImages,
        fetchMemory,
        fetchAll
    }
})
