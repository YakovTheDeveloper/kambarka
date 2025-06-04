import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Habitat } from './types'

export const useHabitatData = defineStore('habitat-data', () => {
  const data = ref<Array<{ id: number; title: string; type: string; image: string }>>([])

  const habitatsMap = ref<Record<string, Habitat>>({})

  const windData = computed(() => data.value.filter((item) => item.type === 'wind'))
  const earthData = computed(() => data.value.filter((item) => item.type === 'earth'))
  const waterData = computed(() => data.value.filter((item) => item.type === 'water'))

  const fetchData = async () => {
    try {
      const response = await axios.get('http://api-kambarka-nature.test.itlabs.top/api/habitat', {
        headers: {
          accept: 'application/json',
        },
      })
      data.value = response.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchHabitat = async (id: number) => {
    try {
      const response = await axios.get(
        `http://api-kambarka-nature.test.itlabs.top/api/habitat/${id}`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      )
      const data = response.data as Habitat
      if (data) {
        habitatsMap.value[data.id] = response.data
      }
    } catch (error) {
      console.error('Error fetching habitat:', error)
      throw error
    }
  }

  const getById = (id: number) => {
    return habitatsMap.value[id]
  }

  return { windData, earthData, waterData, fetchData, fetchHabitat, getById }
})
