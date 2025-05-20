import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Habitat, Memorial, Preview, Redbook } from './types'
import { useFetch } from '@/stores/useFetch'

export const useMonumentStore = defineStore('monument-store', () => {
    const store = useFetch<Preview, Memorial>('memorial')

    return {
        ...store
    }
})
