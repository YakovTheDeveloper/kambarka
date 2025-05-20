import { ref, computed } from 'vue';

export function useSearch<T extends { [key: string]: any }>(data: T[], key = 'title') {
    const query = ref('');

    const filtered = computed(() =>
        data.filter(item =>
            String(item[key]).toLowerCase().includes(query.value.toLowerCase())
        )
    );

    const onChange = (value: string) => query.value = value

    return {
        query,
        onChange,
        filtered,
    };
}