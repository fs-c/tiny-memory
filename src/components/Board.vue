<script setup lang="ts">
import type { CardWithState } from '@/lib/memory';
import BoardCard from './BoardCard.vue';
import { computed, watch } from 'vue';
import confetti from 'canvas-confetti';
import { useSettings } from '@/stores/settings.store';

const props = defineProps<{
    cardsWithState: CardWithState[];
    gameOver: boolean;
    width: number;
    height: number;
}>();

const { settings } = useSettings();

const sortedCardsWithState = computed(() =>
    settings.cheatMode
        ? [...props.cardsWithState].sort((a, b) => a.key.localeCompare(b.key))
        : props.cardsWithState,
);

watch(props, (newProps) => {
    if (newProps.gameOver) {
        confetti();
    }
});
</script>

<template>
    <div
        class="grid gap-2 px-4 relative"
        :style="{
            'grid-template-columns': `repeat(${width}, minmax(0, 1fr))`,
            'grid-template-rows': `repeat(${height}, minmax(0, 1fr))`,
        }"
    >
        <BoardCard
            v-for="cardWithState in sortedCardsWithState"
            @click="$emit('boardCardClicked', cardWithState.id)"
            :key="cardWithState.id"
            :card-with-state="cardWithState"
        />

        <button
            v-if="gameOver"
            @click="$emit('gameRestart')"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-md bg-yellow-600 text-gray-100 font-bold text-lg"
        >
            Restart
        </button>
    </div>
</template>
