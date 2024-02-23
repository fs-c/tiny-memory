export enum UncoveredState {
    Covered,
    InThisMove,
    InLastMove,
}

export interface Card {
    index: number;
    key: string;
    uncovered: UncoveredState;
    removed: boolean;
}

export function cardIsUncovered(card: Card): boolean {
    return card.uncovered !== UncoveredState.Covered && !card.removed;
}

export function createOrderedMemoryBoard(numberOfCards: number): Card[] {
    return new Array(numberOfCards)
        .fill(0)
        .map((e, index) => ({
            index,
            key: String(Math.floor(index / 2) + 1),
            uncovered: UncoveredState.Covered,
            removed: false,
        }));
}

export function createRandomMemoryBoard(numberOfCards: number): Card[] {
    return createOrderedMemoryBoard(numberOfCards)
        .map((card) => ({
            card,
            sort: Math.random(),
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ card }, index) => ({ ...card, index }));
}
