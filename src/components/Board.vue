<script setup lang="ts">
import type { CardWithState } from '@/lib/memory';
import BoardCard from './BoardCard.vue';
import { computed } from 'vue';
import { useCheatMode } from '@/stores/cheat-mode.store';

const props = defineProps<{
    cardsWithState: CardWithState[];
    gameOver: boolean;
}>();

const { cheatMode } = useCheatMode();

const sortedCardsWithState = computed(() =>
    cheatMode.value
        ? [...props.cardsWithState].sort((a, b) => a.key.localeCompare(b.key))
        : props.cardsWithState,
);
</script>

<template>
    <div class="grid grid-cols-6 grid-rows-6 gap-2 px-4 relative">
        <BoardCard
            v-for="cardWithState in sortedCardsWithState"
            @click="$emit('boardCardClicked', cardWithState.id)"
            :key="cardWithState.id"
            :cardWithState="cardWithState"
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
