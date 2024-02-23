<script lang="ts">
export const CHEAT_MODE_ENABLED_KEY: InjectionKey<Ref<boolean>> = Symbol('CHEAT_MODE_ENABLED_KEY');
</script>

<script setup lang="ts">
import MemoryGame from './components/MemoryGame.vue';
import MemoryFooter from './components/MemoryFooter.vue';

import { provide, ref, type InjectionKey, type Ref } from 'vue';

const cheatModeEnabled = ref(false);
provide(CHEAT_MODE_ENABLED_KEY, cheatModeEnabled);
</script>

<template>
    <MemoryGame />

    <MemoryFooter @toggle-cheat-mode="cheatModeEnabled = !cheatModeEnabled" />
</template>
