export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
    let timeout: number | null = null;
  
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise((resolve) => {
            if (timeout !== null) {
                clearTimeout(timeout)
            }
  
            timeout = setTimeout(() => resolve(func(...args)), waitFor)
        });
}

export function sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });
}
