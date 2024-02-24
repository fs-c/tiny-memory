<script setup lang="ts">
import { getAssetLinkForCard, type CardWithState } from '@/lib/memory';
import { computed } from 'vue';

const props = defineProps<{
    cardWithState: CardWithState;
}>();

const assetLink = computed(() => getAssetLinkForCard(props.cardWithState));
</script>

<template>
    <div v-if="!cardWithState.removed" class="outer-wrapper aspect-square">
        <div class="inner-wrapper h-full" :class="{ uncovered: cardWithState.uncovered === true }">
            <div class="front bg-zinc-700 rounded-md"></div>

            <div class="back rounded-md overflow-hidden">
                <img :src="assetLink" :alt="cardWithState.key" class="object-cover w-full h-full" />
            </div>
        </div>
    </div>
    <div v-else class="aspect-square bg-zinc-700 opacity-10 rounded-md"></div>
</template>

<style scoped>
.outer-wrapper {
    perspective: 1000px;
}

.inner-wrapper {
    position: relative;
    transform-style: preserve-3d;
    transition: all 250ms ease-in-out;
}

.inner-wrapper.uncovered {
    transform: rotateY(180deg);
}

.front,
.back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.back {
    transform: rotateY(180deg);
}
</style>
