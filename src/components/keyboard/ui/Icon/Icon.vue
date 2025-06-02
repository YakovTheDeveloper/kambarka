<script setup lang="ts">
import GlyphShift from '@/components/icons/GlyphShift.vue';
import GlyphShiftActive from '@/components/icons/GlyphShiftActive.vue';
import { computed, watchEffect } from 'vue';

interface IconProps {
  name: string;
  class?: string;
}

const props = defineProps<IconProps>();

const icons: Record<string, any> = {
  'shift': GlyphShift,
  'glyph2': GlyphShiftActive,
  'glyph': GlyphShift,
};

const icon = computed(() => icons[props.name] ?? null);
watchEffect(() => console.log(props.name))
</script>

<template>
  <component :is="icon" :alt="`${props.name} icon`" :class="props.class" />
</template>
