import { buildDeck, shuffleDeck, dealCards, deal, Card } from "./deck.js";
import { hasFourOfAKindOrBetter, hasRoyalFlushOrBetter } from "./rules.js";

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

export function royalFlushVsQuadsAces(players: number): boolean {
  const deck = buildDeck();
  const shuffledDeck = shuffleDeck(deck);
  const hand = deal(shuffledDeck, players, 2);
  const board = [...hand.flop, hand.turn, hand.river];

  var royalHand: Card[] | undefined;
  var quadsAcesHand: Card[] | undefined;

  for (let player of hand.playerCards) {
    if (hasRoyalFlushOrBetter(player, board)) {
      royalHand = player;
    }
    const [hasQuads, quadsNumber] = hasFourOfAKindOrBetter(player, board);
    if (hasQuads && quadsNumber === "A") {
      quadsAcesHand = player;
    }
  }

  if (royalHand && quadsAcesHand) {
    console.log(
      royalHand.map((card) => card.id),
      quadsAcesHand.map((card) => card.id)
    );
    console.log(board.map((card) => card.id));
    return true;
  }

  return false;
}
