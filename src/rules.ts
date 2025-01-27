import { Card, CardNumber, CardSuit, getNumber } from "./deck.js";

export function hasPocketPair(hand: Card[]): boolean {
  if (hand.length !== 2) {
    throw new Error("Hand must contain exactly 2 cards");
  }
  return hand[0].number === hand[1].number;
}

function countNumbers(
  hand: Card[],
  board: Card[],
  suit?: CardSuit
): Record<CardNumber, number> {
  const counter: Record<CardNumber, number> = {
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    T: 0,
    J: 0,
    Q: 0,
    K: 0,
    A: 0,
  };

  for (let card of board) {
    if (suit && card.suit !== suit) {
      continue;
    }
    counter[card.number]++;
  }

  for (let card of hand) {
    if (suit && card.suit !== suit) {
      continue;
    }
    counter[card.number]++;
  }

  return counter;
}

function countSuits(hand: Card[], board: Card[]): Record<CardSuit, number> {
  const counter: Record<CardSuit, number> = {
    s: 0,
    h: 0,
    d: 0,
    c: 0,
  };

  for (let card of board) {
    counter[card.suit]++;
  }

  for (let card of hand) {
    counter[card.suit]++;
  }

  return counter;
}

export function hasPairOrBetter(hand: Card[], board: Card[]): boolean {
  const counter = countNumbers(hand, board);
  return Object.values(counter).filter((count) => count >= 2).length > 0;
}

export function hasTwoPairOrBetter(hand: Card[], board: Card[]): boolean {
  const counter = countNumbers(hand, board);
  return Object.values(counter).filter((count) => count >= 2).length > 1;
}

export function hasThreeOfAKindOrBetter(hand: Card[], board: Card[]): boolean {
  const counter = countNumbers(hand, board);
  return Object.values(counter).filter((count) => count >= 3).length > 0;
}

export function hasStraightOrBetter(hand: Card[], board: Card[]): boolean {
  const counter = countNumbers(hand, board);

  for (let i = 0; i < 10; i++) {
    var straightCounter = 0;
    for (let j = 0; j < 5; j++) {
      if (counter[getNumber(i + j)] >= 1) {
        straightCounter++;
      } else {
        break;
      }
    }
    if (straightCounter === 5) {
      return true;
    }
  }

  return false;
}

export function hasFlushOrBetter(
  hand: Card[],
  board: Card[]
): [boolean, CardSuit | undefined] {
  const counter = countSuits(hand, board);
  const flushSuit = Object.keys(counter).find(
    (suit) => counter[suit as CardSuit] >= 5
  );
  return [flushSuit !== undefined, flushSuit as CardSuit];
}

export function hasFullHouseOrBetter(hand: Card[], board: Card[]): boolean {
  const counter = countNumbers(hand, board);
  return (
    Object.values(counter).filter((count) => count >= 3).length > 0 &&
    Object.values(counter).filter((count) => count >= 2).length > 1
  );
}

export function hasFourOfAKindOrBetter(
  hand: Card[],
  board: Card[]
): [boolean, CardNumber | undefined] {
  const counter = countNumbers(hand, board);
  const fourOfAKindNumber = Object.keys(counter).find(
    (number) => counter[number as CardNumber] >= 4
  );
  return [fourOfAKindNumber !== undefined, fourOfAKindNumber as CardNumber];
}

export function hasStraightFlushOrBetter(hand: Card[], board: Card[]): boolean {
  const [hasFlush, flushSuit] = hasFlushOrBetter(hand, board);
  if (!hasFlush) {
    return false;
  }

  const counter = countNumbers(hand, board, flushSuit);
  for (let i = 0; i < 10; i++) {
    var straightCounter = 0;
    for (let j = 0; j < 5; j++) {
      if (counter[getNumber(i + j)] >= 1) {
        straightCounter++;
      } else {
        break;
      }
    }
    if (straightCounter === 5) {
      return true;
    }
  }

  return false;
}

export function hasRoyalFlushOrBetter(hand: Card[], board: Card[]): boolean {
  const [hasFlush, flushSuit] = hasFlushOrBetter(hand, board);

  if (!hasFlush) {
    return false;
  }

  const cards = [...hand, ...board];

  const hasTheAce = cards.some(
    (card) => card.number === "A" && card.suit === flushSuit
  );
  const hasTheKing = cards.some(
    (card) => card.number === "K" && card.suit === flushSuit
  );
  const hasTheQueen = cards.some(
    (card) => card.number === "Q" && card.suit === flushSuit
  );
  const hasTheJack = cards.some(
    (card) => card.number === "J" && card.suit === flushSuit
  );
  const hasTheTen = cards.some(
    (card) => card.number === "T" && card.suit === flushSuit
  );

  return hasTheAce && hasTheKing && hasTheQueen && hasTheJack && hasTheTen;
}
