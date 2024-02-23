<script setup lang="ts">
import { onMounted } from 'vue';
import BoardCard from './BoardCard.vue';
import type { Card } from './Memory.vue';

const { cards } = defineProps<{ cards: Card[] }>();

onMounted(() => {
    // preload all assets, regular link preload doesn't appear to work in this context
    for (const card of cards) {
        const image = new Image();
        image.src = card.asset;
    }
});
</script>

<template>
    <div class="grid grid-cols-6 grid-rows-6 gap-2 px-4">
        <BoardCard
            v-for="(card, index) in cards"
            @click="$emit('boardCardClicked', index)"
            :key="index"
            :card="card"
        />
    </div>
</template>
