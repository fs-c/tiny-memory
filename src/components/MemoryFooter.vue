<script setup lang="ts">
import { useSettings } from '@/stores/settings.store';
import { computed } from 'vue';
import XMark from './lib/icons/XMark.vue';
import NumberInput from './lib/NumberInput.vue';

const { settings, toggleCheatMode, setBoardDimensions } = useSettings();

const cheatModeText = computed(
    () => `${settings.cheatMode === true ? 'Disable' : 'Enable'} cheat mode.`,
);

const onWidthPlusOne = () => {
    setBoardDimensions({ ...settings.boardDimensions, width: settings.boardDimensions.width + 1 });
};

const onHeightPlusOne = () => {
    setBoardDimensions({
        ...settings.boardDimensions,
        height: settings.boardDimensions.height + 1,
    });
};

const onWidthMinusOne = () => {
    setBoardDimensions({ ...settings.boardDimensions, width: settings.boardDimensions.width - 1 });
};

const onHeightMinusOne = () => {
    setBoardDimensions({
        ...settings.boardDimensions,
        height: settings.boardDimensions.height - 1,
    });
};
</script>

<template>
    <div class="bg-zinc-800">
        <div class="px-4 py-8 mx-auto max-w-xl flex flex-col items-start gap-4">
            <div class="flex flex-col gap-2">
                <h2>Board Dimensions</h2>

                <div class="flex flex-row gap-2 items-center">
                    <NumberInput
                        :min="3"
                        :max="10"
                        :value="settings.boardDimensions.width"
                        @plus-one="onWidthPlusOne"
                        @minus-one="onWidthMinusOne"
                    />

                    <XMark />

                    <NumberInput
                        :min="3"
                        :max="10"
                        :value="settings.boardDimensions.height"
                        @plus-one="onHeightPlusOne"
                        @minus-one="onHeightMinusOne"
                    />
                </div>
            </div>

            <button class="text-base underline text-gray-500" @click="toggleCheatMode()">
                {{ cheatModeText }}
            </button>
        </div>
    </div>

    <footer class="bg-zinc-700">
        <div class="px-4 py-12 mx-auto max-w-xl flex flex-col items-start gap-8 text-xl">
            <p>
                A tiny implementation of the game <b>memory</b>, using
                <a href="https://vuejs.org/" class="underline">vue</a> and
                <a href="https://tailwindcss.com/" class="underline">tailwind</a>.
            </p>

            <p>
                Find the source code on
                <a href="https://github.com/fs-c/tiny-memory" class="underline">github</a>.
            </p>
        </div>
    </footer>
</template>
