<script lang="ts">
export enum UncoveredState {
    Covered,
    InThisMove,
    InLastMove,
}
</script>

<script setup lang="ts">
import PlayerView from './PlayerView.vue';
import Board from './Board.vue';
import { computed, ref } from 'vue';

export interface Card {
    index: number;
    key: string;
    asset: string;
    uncovered: UncoveredState;
    removed: boolean;
}

export interface Player {
    name: string;
    correctCards: Card[];
}

const players = ref<[Player, Player]>([
    { name: 'Player A', correctCards: [] },
    { name: 'Player B', correctCards: [] },
]);

const activePlayer = ref(0);

const cards = ref<Card[]>(
    new Array(36)
        .fill({})
        .map((e, index) => ({
            card: {
                index,
                key: String(Math.floor(index / 2) + 1),
                uncovered: UncoveredState.Covered,
                removed: false,
            },
            sort: Math.random(),
        }))
        // .sort((a, b) => a.sort - b.sort)
        .map(({ card }, index) => ({ ...card, asset: `/cards/${card.key}.svg`, index })),
);

const uncoveredCards = computed(() =>
    cards.value.filter((card) => card.uncovered && !card.removed),
);

const boardCardClicked = (index: number) => {
    // length 2 happens when previous was wrong and now the other player still sees the two cards
    if (uncoveredCards.value.length === 0 || uncoveredCards.value.length === 2) {
        for (const uncoveredCard of uncoveredCards.value) {
            cards.value[uncoveredCard.index].uncovered = UncoveredState.Covered;
        }

        cards.value[index].uncovered = UncoveredState.InThisMove;
    } else if (uncoveredCards.value.length === 1) {
        const previous = uncoveredCards.value[0];
        if (previous.index === index) {
            return;
        }

        cards.value[index].uncovered = UncoveredState.InThisMove;

        if (previous.key === cards.value[index].key) {
            cards.value[index].removed = true;
            cards.value[previous.index].removed = true;

            players.value[activePlayer.value].correctCards.push(previous);
        } else {
            activePlayer.value = activePlayer.value === 0 ? 1 : 0;

            for (const uncoveredCard of uncoveredCards.value) {
                cards.value[uncoveredCard.index].uncovered = UncoveredState.InLastMove;
            }
        }
    }
};
</script>

<template>
    <main class="flex flex-col justify-center h-screen">
        <PlayerView :is-active="activePlayer === 0" :player="players[0]" :inverted-layout="false" />

        <Board :cards="cards" @boardCardClicked="boardCardClicked($event)" />

        <PlayerView :is-active="activePlayer === 1" :player="players[1]" :inverted-layout="true" />
    </main>
</template>
