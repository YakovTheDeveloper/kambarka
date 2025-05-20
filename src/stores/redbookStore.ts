import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Habitat, Preview, Redbook } from './types'
import { useFetch } from '@/stores/useFetch'

export const useRedBookStore = defineStore('redbook-store', () => {
    const store = useFetch<Preview, Redbook>('redBook')

    return {
        ...store
    }
})
