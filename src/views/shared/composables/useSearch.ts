import { ref, computed, type Ref } from 'vue';

export function useSearch<T extends { [key: string]: any }>(data: Ref<T[]>, key = 'title') {
    console.log('data', data);
    const query = ref('');

    const filtered = computed(() =>
        data.value.filter(item =>
            String(item[key]).toLowerCase().includes(query.value.toLowerCase())
        )
    );

    const noData = computed(() => filtered.value.length === 0 && query.value !== '')
    const onChange = (value: string) => query.value = value
    const clear = () => query.value = ''

    return {
        query,
        onChange,
        clear,
        filtered,
        noData
    };
}