<script setup lang="ts">
import BoardCard from './BoardCard.vue';
import { type Player } from './Memory.vue';

const { isActive, isWinner, player, invertedLayout } = defineProps<{
    isActive: boolean;
    isWinner: boolean;
    player: Player;
    invertedLayout: boolean;
}>();
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
            }"
        >
            <div
                v-for="card of player.correctCards"
                :key="card.key"
                class="w-8 md:w-12 relative"
                :class="{ grayscale: !isActive }"
            >
                <BoardCard :card="card" :ignore-visibility="true" :skip-preload="true" />

                <div class="w-8 md:w-12 z-[-1] absolute -right-1 -bottom-1 rotate-6">
                    <BoardCard :card="card" :ignore-visibility="true" :skip-preload="true" />
                </div>
            </div>
        </div>
    </div>
</template>
