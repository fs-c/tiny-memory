import { reactive, readonly, watch } from 'vue';

interface Settings {
    cheatMode: boolean;
    boardDimensions: {
        width: number;
        height: number;
    };
}

const SETTINGS_KEY = 'settings';

const savedSettings = window.localStorage.getItem(SETTINGS_KEY);
const initialSettings: Settings = {
    cheatMode: false,
    boardDimensions: { width: 6, height: 6 },
    ...(savedSettings ? JSON.parse(savedSettings) : {}),
};

const settings = reactive(initialSettings);

export function useSettings() {
    return {
        settings: readonly(settings),
        toggleCheatMode: () => (settings.cheatMode = !settings.cheatMode),
        setBoardDimensions: (dimensions: { width: number; height: number }) =>
            (settings.boardDimensions = { ...dimensions }),
    };
}

watch(settings, () => {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
});
