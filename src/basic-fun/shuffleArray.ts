/**
 * Returns shuffled version of input array. Shuffles using Knuth's algorithm
 * (an optimized version of the Fisher-Yates shuffle, see
 * https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
 * @param arr The array to shuffle
 * @eturns Randomized array
 * */
export default function shuffle<T>(arr: T[]): T[] {

  // clone array in order to not modify original array
  let new_arr = structuredClone(arr);

  for (let i = new_arr.length - 1; i > 0; i--) {
    let idx = Math.floor(Math.random() * (i + 1));
    let current = new_arr[i];
    new_arr[i] = new_arr[idx];
    new_arr[idx] = current;
  }

  return new_arr;
}