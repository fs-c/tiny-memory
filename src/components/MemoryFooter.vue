<script setup lang="ts">
import { useSettings } from '@/stores/settings.store';
import { computed } from 'vue';

const { settings, toggleCheatMode, setBoardDimensions } = useSettings();

const cheatModeText = computed(
    () => `${settings.cheatMode === true ? 'Disable' : 'Enable'} cheat mode.`,
);

const normalizeDimensionValue = (value: number): number =>
    isNaN(value) ? 2 : value > 10 ? 10 : value < 2 ? 2 : value;

const onChangeDimensions = (value: number, widthOrHeight: 'width' | 'height') => {
    // todo: needs proper normalization/binding, also enforce even number of cards and
    //       maybe limit the allowed difference between height and width

    const currentDimensions = { ...settings.boardDimensions };

    const normalizedValue = normalizeDimensionValue(value);
    setBoardDimensions({
        ...currentDimensions,
        [widthOrHeight]: normalizedValue,
    });
};
</script>

<template>
    <div class="bg-zinc-800">
        <div class="px-4 py-8 mx-auto max-w-xl flex flex-col items-start gap-4">
            <div class="flex flex-row gap-4 justify-center">
                <label>Board Dimensions</label>

                <input
                    :value="settings.boardDimensions.width"
                    @input="onChangeDimensions($event, 'width')"
                    type="number"
                    class="mt-1 block w-full rounded-md bg-zinc-700 border-transparent focus:border-gray-500 focus:bg-zinc-800 focus:ring-0"
                    placeholder=""
                />

                <input
                    :value="settings.boardDimensions.height"
                    @input="onChangeDimensions($event, 'height')"
                    type="number"
                    class="mt-1 block w-full rounded-md bg-zinc-700 border-transparent focus:border-gray-500 focus:bg-zinc-800 focus:ring-0"
                    placeholder=""
                />
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
