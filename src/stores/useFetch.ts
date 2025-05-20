import { computed, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useFetch = <ListType, ItemType extends { id: number }>(category: string) => {
    const data = ref<Array<ListType>>([])

    const map = ref<Record<string, ItemType>>({})
    const router = useRouter()




    const fetchAll = async () => {

        console.log(category)
        try {
            const response = await axios.get(`http://api-kambarka-nature.test.itlabs.top/api/${category}`, {
                headers: {
                    accept: 'application/json',
                },
            })
            data.value = response.data
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const fetchOne = async () => {
        const { id } = router.currentRoute.value.params

        try {
            const response = await axios.get(
                `http://api-kambarka-nature.test.itlabs.top/api/${category}/${id}`,
                {
                    headers: {
                        accept: 'application/json',
                    },
                },
            )
            const data = response.data as ItemType
            if (data) {
                map.value[data.id] = response.data
            }
        } catch (error) {
            console.error('Error fetching habitat:', error)
            throw error
        }
    }

    const routeIdData = computed(() => {
        const { id } = router.currentRoute.value.params
        return map.value[id as string]
    })

    return { fetchAll, fetchOne, routeIdData, data, map }
}
