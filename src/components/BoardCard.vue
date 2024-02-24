<script setup lang="ts">
import { getAssetLinkForCard, type CardWithState } from '@/lib/memory';
import { computed, onMounted } from 'vue';

const props = defineProps<{
    cardWithState: CardWithState;
}>();

const assetLink = computed(() => getAssetLinkForCard(props.cardWithState));

onMounted(() => {
    // preload image, regular link prefetch doesn't appear to work in this context
    const image = new Image();
    image.src = assetLink.value;
});
</script>

<template>
    <div v-if="!cardWithState.removed" class="aspect-square bg-zinc-700 rounded-md overflow-hidden">
        <div
            v-if="cardWithState.uncovered"
            class="h-full text-xl font-bold text-gray-900 flex justify-center items-center"
        >
            <img :src="assetLink" :alt="cardWithState.key" class="object-cover w-full h-full" />
        </div>
    </div>
    <div v-else class="aspect-square bg-zinc-700 opacity-10 rounded-md"></div>
</template>
