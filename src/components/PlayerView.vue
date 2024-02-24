<script setup lang="ts">
import { computed } from 'vue';
import { type Player } from './MemoryGame.vue';
import { getAssetLinkForCard } from '@/lib/memory';

const props = defineProps<{
    isActive: boolean;
    isWinner: boolean;
    player: Player;
    invertedLayout: boolean;
}>();

const correctCardsWithAsset = computed(() =>
    props.player.correctCards.map((card) => ({ card, assetLink: getAssetLinkForCard(card) })),
);
</script>

<template>
    <div
        class="flex gap-3 p-4 h-full"
        :class="{
            'flex-col-reverse items-start': !invertedLayout,
            'flex-col items-end': invertedLayout,
        }"
    >
        <div
            class="font-bold text-lg w-max"
            :class="{
                'text-gray-100 underline underline-offset-4': isActive,
                'text-gray-400': !isActive,
                'text-yellow-500': isWinner,
            }"
        >
            {{ player.name }}
        </div>

        <div
            class="flex gap-4"
            :class="{
                'flex-row flex-wrap-reverse': !invertedLayout,
                'flex-row-reverse flex-wrap': invertedLayout,
                grayscale: !isActive,
            }"
        >
            <TransitionGroup name="card-list">
                <div
                    v-for="{ card, assetLink } of correctCardsWithAsset"
                    :key="card.id"
                    class="w-8 md:w-12 aspect-square relative"
                >
                    <img
                        :src="assetLink"
                        :alt="card.key"
                        class="rounded-md object-cover w-full h-full"
                    />

                    <div
                        class="rotated-card absolute w-full h-full z-[-1] -right-1 -bottom-1 rotate-6"
                    >
                        <img
                            :src="assetLink"
                            :alt="card.key"
                            class="rounded-md object-cover w-full h-full"
                        />
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
.card-list-move,
.card-list-enter-active {
    transition: all 150ms ease-out;
    transform: scale(1);
}

.card-list-enter-from {
    transform: scale(0);
}

.card-list-enter-active .rotated-card {
    transition: all 250ms ease-out;
    transition-delay: 175ms;
    right: -0.25rem;
    bottom: -0.25rem;
    transform: rotate(6deg);
}

.card-list-enter-from .rotated-card {
    right: 0;
    bottom: 0;
    transform: rotate(0);
}
</style>
