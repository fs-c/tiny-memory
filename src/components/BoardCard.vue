<script setup lang="ts">
import { getAssetLinkForCard, type CardWithState } from '@/lib/memory';
import { computed } from 'vue';

const props = defineProps<{
    cardWithState: CardWithState;
}>();

const assetLink = computed(() => getAssetLinkForCard(props.cardWithState));
</script>
<template>
    <div class="relative aspect-square">
        <Transition name="removed-transition" mode="out-in">
            <div v-if="!cardWithState.removed" class="card w-full h-full absolute">
                <div
                    class="inner-wrapper h-full"
                    :class="{ uncovered: cardWithState.uncovered === true }"
                >
                    <div class="front bg-zinc-700 rounded-md"></div>

                    <div class="back rounded-md overflow-hidden">
                        <img
                            :src="assetLink"
                            :alt="cardWithState.key"
                            class="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </Transition>
        <div class="bg-zinc-700 w-full h-full opacity-10 rounded-md absolute"></div>
    </div>
</template>

<style scoped>
.removed-transition-enter-active,
.removed-transition-leave-active {
    transition: all 150ms ease-out;
}

.removed-transition-enter-from {
    opacity: 100;
}

.removed-transition-leave-to {
    opacity: 0;
}

.card {
    perspective: 1000px;
}

.inner-wrapper {
    position: relative;
    transform-style: preserve-3d;
    transition: all 250ms ease-in-out;
    transition-delay: 0ms;
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
