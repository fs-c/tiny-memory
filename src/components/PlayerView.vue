<script setup lang="ts">
import BoardCard from './BoardCard.vue';
import type { Player } from './Memory.vue';

const { isActive, player, invertedLayout } = defineProps<{
    isActive: boolean;
    player: Player;
    invertedLayout: boolean;
}>();
</script>

<template>
    <div
        class="flex gap-2 px-4 py-8"
        :class="{
            'flex-col': !invertedLayout,
            'flex-col-reverse': invertedLayout,
        }"
    >
        <div
            class="font-bold text-lg"
            :class="{
                'text-gray-100 underline underline-offset-4': isActive,
                'text-gray-400': !isActive,
            }"
        >
            {{ player.name }}
        </div>

        <div class="flex flex-row flex-wrap gap-4">
            <div
                v-for="card of player.correctCards"
                :key="card.key"
                class="w-8 h-8 relative"
                :class="{ grayscale: !isActive }"
            >
                <BoardCard :card="{ ...card, removed: false, uncovered: true }" />

                <div class="w-8 h-8 z-[-1] absolute -right-1 -bottom-1">
                    <BoardCard :card="{ ...card, removed: false, uncovered: true }" />
                </div>
            </div>
        </div>
    </div>
</template>
