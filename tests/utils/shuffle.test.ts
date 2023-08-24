import shuffle from "../../src/utils/shuffle"

describe("shuffle", () => {
  it("should not mutate the original array", () => {
    const source = [1, 2, 3, 4, 5];
    const originalCopy = [...source];
    shuffle(source);
    expect(source).toEqual(originalCopy);
  });

  it("should return an array with all original elements", () => {
    const source = [1, 2, 3, 4, 5];
    const shuffled = shuffle(source);
    expect(shuffled).toHaveLength(source.length);
    for (const element of source) {
      expect(shuffled).toContain(element);
    }
  });

  it("should shuffle evenly over many iterations", () => {
    const source = [1, 2, 3];
    const countMap: Record<number, Record<number, number>> = {};

    for (const element of source) {
      countMap[element] = {};
      for (let i = 0; i < source.length; i++) {
        countMap[element][i] = 0;
      }
    }

    const numIterations = 10000;
    for (let i = 0; i < numIterations; i++) {
      const shuffled = shuffle(source);
      shuffled.forEach((element, index) => {
        countMap[element][index]++;
      });
    }

    // Now check if the distribution is roughly even
    for (const element in countMap) {
      for (const position in countMap[element]) {
        const count = countMap[element][position];
        const expectedCount = numIterations / source.length;
        // Allow for a small deviation (e.g., 5%)
        const deviation = expectedCount * 0.05;
        expect(count).toBeGreaterThanOrEqual(expectedCount - deviation);
        expect(count).toBeLessThanOrEqual(expectedCount + deviation);
      }
    }
  });
});