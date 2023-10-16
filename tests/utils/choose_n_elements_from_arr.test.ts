import chooseNElementsFromArray from '../../src/basic-fun/chooseNElementsFromArray'


describe("chooseNElementsFromArray", () => {
  it("should return an array with n elements", () => {
    const source = [1, 2, 3, 4, 5];
    const chosen = chooseNElementsFromArray(source, 3);
    expect(chosen.length).toBe(3);
  });

  it("should not return elements not in the source array", () => {
    const source = [1, 2, 3, 4, 5];
    const chosen = chooseNElementsFromArray(source, 3);
    for (const element of chosen) {
      expect(source).toContain(element);
    }
  });

  it("should not mutate the original array", () => {
    const source = [1, 2, 3, 4, 5];
    const originalCopy = [...source];
    chooseNElementsFromArray(source, 3);
    expect(source).toEqual(originalCopy);
  });


  it("should return unique elements in the result", () => {
    const source = [1, 2, 3, 4, 5];
    const chosen = chooseNElementsFromArray(source, 3);
    const uniqueChosen = Array.from(new Set(chosen));
    expect(chosen).toEqual(uniqueChosen);
  });

   it("should choose elements evenly over many iterations", () => {
     const source = [1, 2, 3, 4, 5];
     const numElementsToChoose = 2;

     // Initialize a count map
     const countMap: Record<number, number> = {};
     for (const element of source) {
       countMap[element] = 0;
     }

     const numIterations = 10000;
     for (let i = 0; i < numIterations; i++) {
       const chosen = chooseNElementsFromArray(source, numElementsToChoose);
       for (const element of chosen) {
         countMap[element]++;
       }
     }

     // Calculate expected count
     // Each element has a `numElementsToChoose / source.length` chance of being chosen in one iteration.
     const expectedCount =
       numIterations * (numElementsToChoose / source.length);
     // Allow for a small deviation (e.g., 5%)
     const deviation = expectedCount * 0.05;

     // Check that each element's count is within acceptable bounds
     for (const element of source) {
       expect(countMap[element]).toBeGreaterThanOrEqual(
         expectedCount - deviation
       );
       expect(countMap[element]).toBeLessThanOrEqual(expectedCount + deviation);
     }
   });

});