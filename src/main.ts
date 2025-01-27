import { preflopAcesKingsQueens, flopRoyalFlush } from "./checks.js";
import { buildDeck, dealCards, shuffleDeck } from "./deck.js";
import { hasRoyalFlushOrBetter } from "./rules.js";

function runThesis(
  iterations: number,
  func: () => boolean,
  verbose: boolean = false
): { count: number; iterations: number } {
  let count = 0;
  for (let i = 0; i < iterations; i++) {
    if (func()) {
      count++;

      if (verbose) {
        console.log(
          `Found ${count} times, out of ${i} iterations (1 out of ${Math.round(
            i / count
          )})`
        );
      }
    }

    if (i % 1000000 === 0) {
      if (verbose) {
        console.log(`${i / 1000000}M iterations completed`);
      }
    }
  }

  console.log("--------------------------------");
  console.log("COMPLETED!");
  console.log("--------------------------------");
  console.log(`Found ${count} times, out of ${iterations} iterations`);
  console.log(`1 out of ${Math.round(iterations / count)}`);
  console.log(`${(count / iterations) * 100}%`);

  return {
    count: count,
    iterations: iterations,
  };
}

function main(): void {
  const result = runThesis(10000000000, () => flopRoyalFlush(1), true);
}

main();
