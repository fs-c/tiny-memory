<script setup lang="ts">
import { type Card, UncoveredState } from '@/lib/memory';
import { onMounted } from 'vue';

const {
    card,
    ignoreVisibility = false,
    skipPreload = false,
} = defineProps<{
    card: Card;
    ignoreVisibility?: boolean;
    skipPreload?: boolean;
}>();

const assetLink = `/cards/${card.key}.svg`;

onMounted(() => {
    if (!skipPreload) {
        // preload image, regular link prefetch doesn't appear to work in this context
        const image = new Image();
        image.src = assetLink;
    }
});
</script>

<template>
    <div
        v-if="!card.removed || ignoreVisibility"
        class="aspect-square bg-zinc-700 rounded-md overflow-hidden"
    >
        <div
            v-if="card.uncovered !== UncoveredState.Covered || ignoreVisibility"
            class="h-full text-xl font-bold text-gray-900 flex justify-center items-center"
        >
            <img :src="assetLink" :alt="card.key" class="object-cover w-full h-full" />
        </div>
    </div>
    <div v-else class="aspect-square bg-zinc-700 opacity-10 rounded-md"></div>
</template>
