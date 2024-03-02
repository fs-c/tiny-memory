<script setup lang="ts">
import Plus from './icons/Plus.vue';
import Minus from './icons/Minus.vue';

const props = defineProps<{
    value: number;
    min: number;
    max: number;
}>();
</script>

<template>
    <div
        class="rounded-md bg-zinc-700 focus:border-gray-500 focus:bg-zinc-800 flex gap-1 items-center p-1"
    >
        <div class="px-4">
            {{ value }}
        </div>

        <button
            class="flex items-center justify-center w-8 h-8 p-2 rounded-md bg-zinc-600 text-xl disabled:bg-zinc-700"
            @click="$emit('minusOne')"
            :disabled="props.value <= props.min"
        >
            <Minus />
        </button>

        <button
            class="flex items-center justify-center w-8 h-8 p-2 rounded-md bg-zinc-600 text-xl disabled:bg-zinc-700"
            @click="$emit('plusOne')"
            :disabled="props.value >= props.max"
        >
            <Plus />
        </button>
    </div>
</template>
