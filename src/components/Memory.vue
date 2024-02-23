<script setup lang="ts">
import PlayerView from './PlayerView.vue';
import Board from './Board.vue';
import { type Card, UncoveredState, createRandomMemoryBoard, cardIsUncovered } from '@/lib/memory';
import { computed, ref } from 'vue';

export interface Player {
    name: string;
    correctCards: Card[];
}

const boardWidth = 6;
const boardHeight = 6;
const numberOfCards = boardWidth * boardHeight;

const players = ref<[Player, Player]>([
    { name: 'Player A', correctCards: [] },
    { name: 'Player B', correctCards: [] },
]);
const activePlayerIndex = ref(0);
const winningPlayerIndex = computed(() =>
    players.value[0].correctCards.length > players.value[1].correctCards.length ? 0 : 1,
);

const cards = ref(createRandomMemoryBoard(numberOfCards));
const uncoveredCards = computed(() => cards.value.filter(cardIsUncovered));

const gameOver = ref(false);

const onBoardCardClicked = (index: number): void => {
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

            players.value[activePlayerIndex.value].correctCards.push(previous);

            const totalUncovered =
                players.value[0].correctCards.length + players.value[1].correctCards.length;
            if (totalUncovered * 2 === cards.value.length) {
                gameOver.value = true;
                activePlayerIndex.value = winningPlayerIndex.value;
            }
        } else {
            activePlayerIndex.value = activePlayerIndex.value === 0 ? 1 : 0;

            for (const uncoveredCard of uncoveredCards.value) {
                cards.value[uncoveredCard.index].uncovered = UncoveredState.InLastMove;
            }
        }
    }
};

const onGameRestart = (): void => {
    gameOver.value = false;
    cards.value = createRandomMemoryBoard(numberOfCards);
    players.value = [
        { name: 'Player A', correctCards: [] },
        { name: 'Player B', correctCards: [] },
    ];
};
</script>

<template>
    <main class="flex flex-col justify-center h-screen max-w-screen-md mx-auto">
        <PlayerView
            :is-winner="gameOver && winningPlayerIndex === 0"
            :is-active="activePlayerIndex === 0"
            :player="players[0]"
            :inverted-layout="false"
        />

        <Board
            :cards="cards"
            :game-over="gameOver"
            @board-card-clicked="onBoardCardClicked($event)"
            @game-restart="onGameRestart"
        />

        <PlayerView
            :is-winner="gameOver && winningPlayerIndex === 1"
            :is-active="activePlayerIndex === 1"
            :player="players[1]"
            :inverted-layout="true"
        />
    </main>
</template>
