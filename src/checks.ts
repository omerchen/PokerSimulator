import { buildDeck, shuffleDeck, dealCards, deal } from "./deck.js";
import { hasRoyalFlushOrBetter } from "./rules.js";

export function preflopAcesKingsQueens(numberOfHands: number): boolean {
  const deck = buildDeck();
  const shuffledDeck = shuffleDeck(deck);
  const hands = dealCards(shuffledDeck, numberOfHands, 2);

  var playerHasAces = false;
  var playerHasKings = false;
  var playerHasQueens = false;

  for (let hand of hands.playerCards) {
    if (hand[0].number === "A" && hand[1].number === "A") {
      playerHasAces = true;
    }
    if (hand[0].number === "K" && hand[1].number === "K") {
      playerHasKings = true;
    }
    if (hand[0].number === "Q" && hand[1].number === "Q") {
      playerHasQueens = true;
    }
  }

  const found = playerHasAces && playerHasKings && playerHasQueens;

  return found;
}

export function flopRoyalFlush(players: number): boolean {
  const deck = buildDeck();
  const shuffledDeck = shuffleDeck(deck);
  const hand = deal(shuffledDeck, players, 2);
  const board = [...hand.flop];

  for (let player of hand.playerCards) {
    if (hasRoyalFlushOrBetter(player, board)) {
      console.log(player, board);
      return true;
    }
  }

  return false;
}
