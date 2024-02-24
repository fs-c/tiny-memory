import { readonly, ref } from "vue";

const cheatMode = ref(false);

export function useCheatMode() {
    return {
        cheatMode: readonly(cheatMode),
        toggleCheatMode: () => cheatMode.value = !cheatMode.value 
    }
}