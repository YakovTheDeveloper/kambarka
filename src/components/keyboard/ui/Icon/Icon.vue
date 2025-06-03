<script setup lang="ts">
import BackspaceIcon from '@/components/icons/BackspaceIcon.vue';
import CrossIcon from '@/components/icons/CrossIcon.vue';
import CrossRoundIcon from '@/components/icons/CrossRoundIcon.vue';
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
  'cross_keyboard': CrossRoundIcon,
  'backspace': BackspaceIcon,
};

const icon = computed(() => icons[props.name] ?? null);
watchEffect(() => console.log(props.name))
</script>

<template>
  <component :is="icon" :alt="`${props.name} icon`" :class="props.class" />
</template>
