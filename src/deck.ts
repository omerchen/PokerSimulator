export type CardNumber =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";

export type CardSuit = "s" | "h" | "d" | "c";

export interface Card {
  id: string;
  number: CardNumber;
  suit: CardSuit;
}

export const getNumber = (n: number): CardNumber => {
  const cards = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
  ] as const;
  return cards[n] as CardNumber;
};

export const getSuit = (n: number): CardSuit => {
  return ["s", "h", "d", "c"][n] as CardSuit;
};

export function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (let n = 0; n < 13; n++) {
    for (let s = 0; s < 4; s++) {
      deck.push({
        id: `${getNumber(n)}${getSuit(s)}`,
        number: getNumber(n),
        suit: getSuit(s),
      });
    }
  }
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  for (let i = 0; i < 1; i++) {
    deck = deck.sort(() => Math.random() - 0.5);
  }
  return deck;
}

export function dealCards(
  deck: Card[],
  players: number,
  cardsPerPlayer: number
): { playerCards: Card[][]; remainingDeck: Card[] } {
  const hands: Card[][] = [];
  for (let i = 0; i < players; i++) {
    hands.push([]);
  }
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < players; j++) {
      hands[j].push(deck[i * players + j]);
    }
  }

  return {
    playerCards: hands,
    remainingDeck: deck.slice(players * cardsPerPlayer),
  };
}

export function burnCard(deck: Card[]): {
  burn: Card;
  remainingDeck: Card[];
} {
  return {
    burn: deck[0],
    remainingDeck: deck.slice(1),
  };
}

export function dealFlop(deck: Card[]): {
  flop: Card[];
  remainingDeck: Card[];
  burn: Card;
} {
  return {
    flop: deck.slice(1, 4),
    remainingDeck: deck.slice(4),
    burn: deck[0],
  };
}

export function dealTurn(deck: Card[]): {
  turn: Card;
  remainingDeck: Card[];
  burn: Card;
} {
  return {
    turn: deck[1],
    remainingDeck: deck.slice(2),
    burn: deck[0],
  };
}

export function dealRiver(deck: Card[]): {
  river: Card;
  remainingDeck: Card[];
  burn: Card;
} {
  return {
    river: deck[1],
    remainingDeck: deck.slice(2),
    burn: deck[0],
  };
}

export function deal(
  deck: Card[],
  players: number,
  cardsPerPlayer: number
): {
  playerCards: Card[][];
  flop: Card[];
  turn: Card;
  river: Card;
  remainingDeck: Card[];
  burns: Card[];
} {
  const { playerCards, remainingDeck: remainingDeckAfterCards } = dealCards(
    deck,
    players,
    cardsPerPlayer
  );
  const {
    flop,
    remainingDeck: remainingDeckAfterFlop,
    burn: burnFlop,
  } = dealFlop(remainingDeckAfterCards);

  const {
    turn,
    remainingDeck: remainingDeckAfterTurn,
    burn: burnTurn,
  } = dealTurn(remainingDeckAfterFlop);
  const {
    river,
    remainingDeck: remainingDeckAfterRiver,
    burn: burnRiver,
  } = dealRiver(remainingDeckAfterTurn);

  return {
    playerCards,
    flop,
    turn,
    river,
    remainingDeck: remainingDeckAfterRiver,
    burns: [burnFlop, burnTurn, burnRiver],
  };
}
