import { ref, type ComputedRef, computed } from 'vue';

export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
    let timeout: number | null = null;

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise((resolve) => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => resolve(func(...args)), waitFor);
        });
}

export function sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function useRefreshable<T>(getter: () => T): {
    value: ComputedRef<T>;
    refresh(): void;
} {
    const refreshKey = ref(1);

    return {
        value: computed(() => {
            refreshKey.value;
            return getter();
        }),
        refresh() {
            refreshKey.value++;
        },
    };
}
