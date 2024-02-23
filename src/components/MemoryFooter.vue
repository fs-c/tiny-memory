<script setup lang="ts">
import { CHEAT_MODE_ENABLED_KEY } from '@/App.vue';
import { computed, inject } from 'vue';

const cheatModeEnabled = inject(CHEAT_MODE_ENABLED_KEY);

const cheatModeText = computed(
    () => `${cheatModeEnabled?.value === true ? 'Disable' : 'Enable'} cheat mode.`,
);
</script>

<template>
    <footer class="px-4 py-12 bg-zinc-800 flex flex-col items-start gap-8 text-xl">
        <p>
            A tiny implementation of the game <b>memory</b>, using
            <a href="https://vuejs.org/" class="underline">vue</a> and
            <a href="https://tailwindcss.com/" class="underline">tailwind</a>.
        </p>

        <p>
            Find the source code on
            <a href="https://github.com/fs-c/tiny-memory" class="underline">github</a>.
        </p>

        <button class="text-base underline text-gray-500" @click="$emit('toggleCheatMode')">
            {{ cheatModeText }}
        </button>
    </footer>
</template>
