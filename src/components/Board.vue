<script setup lang="ts">
import type { Card } from '@/lib/memory';
import BoardCard from './BoardCard.vue';

const { cards, gameOver } = defineProps<{ cards: Card[]; gameOver: boolean }>();
</script>

<template>
    <div class="grid grid-cols-6 grid-rows-6 gap-2 px-4">
        <BoardCard
            v-for="(card, index) in cards"
            @click="$emit('boardCardClicked', index)"
            :key="index"
            :card="card"
        />

        <button
            v-if="gameOver"
            @click="$emit('gameRestart')"
            class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-md bg-yellow-600 text-gray-100 font-bold text-lg"
        >
            Restart
        </button>
    </div>
</template>
