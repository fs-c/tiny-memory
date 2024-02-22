<script setup lang="ts">
import type { Card } from './Memory.vue';

const { card } = defineProps<{ card: Card }>();
</script>

<template>
    <div v-if="!card.removed" class="aspect-square bg-zinc-700 rounded-md overflow-hidden">
        <div
            v-if="card.uncovered"
            class="h-full text-xl font-bold text-gray-900 flex justify-center items-center"
        >
            <img :src="card.asset" :alt="card.key" class="object-cover w-full h-full" />
        </div>
    </div>
    <div v-else></div>
</template>
