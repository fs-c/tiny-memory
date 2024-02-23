<script setup lang="ts">
import { type CardWithState } from '@/lib/memory';
import { computed, onMounted } from 'vue';

const {
    cardWithState,
    ignoreVisibility = false,
    skipPreload = false,
} = defineProps<{
    cardWithState: CardWithState;
    ignoreVisibility?: boolean;
    skipPreload?: boolean;
}>();

const assetLink = computed(() => `/cards/${cardWithState.key}.svg`);

onMounted(() => {
    if (!skipPreload) {
        // preload image, regular link prefetch doesn't appear to work in this context
        const image = new Image();
        image.src = assetLink.value;
    }
});
</script>

<template>
    <div
        v-if="!cardWithState.removed || ignoreVisibility"
        class="aspect-square bg-zinc-700 rounded-md overflow-hidden"
    >
        <div
            v-if="cardWithState.uncovered || ignoreVisibility"
            class="h-full text-xl font-bold text-gray-900 flex justify-center items-center"
        >
            <img :src="assetLink" :alt="cardWithState.key" class="object-cover w-full h-full" />
        </div>
    </div>
    <div v-else class="aspect-square bg-zinc-700 opacity-10 rounded-md"></div>
</template>
