<script setup lang="ts">
import PlayerView from './PlayerView.vue';
import Board from './Board.vue';
import {
    type Card,
    createRandomMemoryBoard,
    cardIsUncovered,
    type CardWithState,
} from '@/lib/memory';
import { computed, ref } from 'vue';
import confetti from 'canvas-confetti';

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

const uncoveredCardIds = ref<Set<string>>(new Set());
const removedCardIds = ref<Set<string>>(new Set());

const cards = ref(createRandomMemoryBoard(numberOfCards));

const cardsWithState = computed<CardWithState[]>(() =>
    cards.value.map((card) => ({
        ...card,
        uncovered: uncoveredCardIds.value.has(card.id),
        removed: removedCardIds.value.has(card.id),
    })),
);

const gameOver = ref(false);

const onBoardCardClicked = async (cardId: Card['id']): Promise<void> => {
    const uncoveredCards = cardsWithState.value.filter(cardIsUncovered);

    // length 2 happens when previous was wrong and now the other player still sees the two cards
    if (uncoveredCards.length === 0 || uncoveredCards.length === 2) {
        // this is the first move

        // for the length 2 special case, first clear the previous uncovered state
        for (const uncoveredCard of uncoveredCards) {
            uncoveredCardIds.value.delete(uncoveredCard.id);
        }

        uncoveredCardIds.value.add(cardId);
    } else if (uncoveredCards.length === 1) {
        // this is the second move

        const previousCard = uncoveredCards[0];
        if (previousCard.id === cardId) {
            // if the same card is clicked twice, pretend nothing happened
            return;
        }

        uncoveredCardIds.value.add(cardId);

        const currentCard = cards.value.find((card) => card.id === cardId);
        if (!currentCard) {
            throw new Error('got invalid card id');
        }

        if (previousCard.key === currentCard.key) {
            // we have a mtch
            removedCardIds.value.add(currentCard.id);
            removedCardIds.value.add(previousCard.id);

            players.value[activePlayerIndex.value].correctCards.push(currentCard);

            const totalUncovered =
                players.value[0].correctCards.length + players.value[1].correctCards.length;
            if (totalUncovered * 2 === cards.value.length) {
                // all cards have been uncovered
                gameOver.value = true;
                activePlayerIndex.value = winningPlayerIndex.value;
                confetti();
            }
        } else {
            // wrong second move, leave the cards uncovered for the next move by the other player
            activePlayerIndex.value = activePlayerIndex.value === 0 ? 1 : 0;
        }
    }
};

const onGameRestart = (): void => {
    players.value[0].correctCards = [];
    players.value[1].correctCards = [];

    // don't reset active player, this way the previous winner gets to go first now

    uncoveredCardIds.value = new Set();
    removedCardIds.value = new Set();

    cards.value = createRandomMemoryBoard(numberOfCards);

    gameOver.value = false;
};
</script>

<template>
    <main class="flex flex-col justify-center h-screen max-w-xl mx-auto">
        <PlayerView
            :is-winner="gameOver && winningPlayerIndex === 0"
            :is-active="activePlayerIndex === 0"
            :player="players[0]"
            :inverted-layout="false"
        />

        <Board
            :cardsWithState="cardsWithState"
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
