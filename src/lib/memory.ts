export interface Card {
    id: string;
    key: string;
}

export interface CardWithState extends Card {
    uncovered: boolean;
    removed: boolean;
}

export function cardIsUncovered(card: CardWithState): boolean {
    return card.uncovered && !card.removed;
}

export function getAssetLinkForCard(card: Card): string {
    return `/cards/${card.key}.svg`;
}

function createOrderedMemoryBoard(numberOfCards: number): Card[] {
    return new Array(numberOfCards)
        .fill(0)
        .map((e, index) => ({
            id: crypto.randomUUID(),
            key: String(Math.floor(index / 2) + 1),
        }));
}

export function createRandomMemoryBoard(numberOfCards: number): Card[] {
    return createOrderedMemoryBoard(numberOfCards)
        .map((card) => ({
            card,
            sort: Math.random(),
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ card }) => card);
}
