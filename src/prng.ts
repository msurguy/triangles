/** Creates a deterministic local PRNG without changing Math.random. */
export function createSeededRandom(seed: string | number): () => number {
  const source = String(seed);
  let state = 1779033703 ^ source.length;

  for (let index = 0; index < source.length; index += 1) {
    state = Math.imul(state ^ source.charCodeAt(index), 3432918353);
    state = (state << 13) | (state >>> 19);
  }

  state = Math.imul(state ^ (state >>> 16), 2246822507);
  state = Math.imul(state ^ (state >>> 13), 3266489909);
  state ^= state >>> 16;

  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
