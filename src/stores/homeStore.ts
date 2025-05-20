import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Habitat, Memorial, Preview, Redbook } from './types'
import { useFetch } from '@/stores/useFetch'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import StarsIcon from '@/components/icons/StarsIcon.vue'
import LeafIcon from '@/components/icons/LeafIcon.vue'
import GameIcon from '@/components/icons/GameIcon.vue'
import GeoIcon from '@/components/icons/GeoIcon.vue'
interface Card {
    title: string
    titleServer: string
    image: string
    to: string
}

export const useHomeStore = defineStore('home-store', () => {
    const sections = ref<Preview[]>([])

    const arealCards: Card[] = computed(() => {
        return [
            { titleServer: sections.value[0]?.title, title: 'Водная', image: getServerImageUrl(sections.value[0]?.image), to: '/habitat?type=water' },
            { titleServer: sections.value[1]?.title, title: 'Наземно-воздушная', image: getServerImageUrl(sections.value[1]?.image), to: '/habitat?type=wind' },
            { titleServer: sections.value[2]?.title, title: 'Почвенная', image: getServerImageUrl(sections.value[2]?.image), to: '/habitat?type=earth' },
        ]
    })

    const menuCards: { titleHTML: string; icon: any; to: string }[] = computed(() => ([
        {
            titleServer: sections.value[4]?.title, titleHTML: `Географическая</br> справка`,
            icon: GeoIcon,
            to: '/geo-info'
        },
        { titleServer: sections.value[5]?.title, titleHTML: 'Достопримечательности района', icon: StarsIcon, to: '/sights' },
        { titleServer: sections.value[6]?.title, titleHTML: 'Памятники</br> природы', icon: LeafIcon, to: '/monuments' },
        { titleServer: sections.value[7]?.title, titleHTML: 'Игры </br> в музее', icon: GameIcon, to: '/games' },
    ]))


    async function fetchSections() {
        try {
            const response = await fetch('http://api-kambarka-nature.test.itlabs.top/api/section', {
                headers: { accept: 'application/json' },
            })
            if (!response.ok) throw new Error('Failed to fetch sections')
            sections.value = await response.json()
        } catch (error) {
            console.error(error)
        }
    }

    return {
        sections,
        fetchSections,
        arealCards,
        menuCards
    }
})
