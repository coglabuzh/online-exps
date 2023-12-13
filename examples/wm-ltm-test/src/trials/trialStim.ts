import { shuffle } from "@coglabuzh/webpsy.js";
export type word = {
  word: string;
};

export type coloredObject = {
  filePath: string;
  rotationAngle: number;
};

export type wordPairStim = {
  type: "wordPairStim";
  words: word[];
};

export type objectColorStim = {
  type: "objectColorStim";
  objects: coloredObject[];
};

export type stimuli = (wordPairStim | objectColorStim)[];

export type wordPairLtmStim = {
  type: "wordPairLtmStim";
  probe_word: word;
  new_word: word;
  order: "probe_first" | "new_first";
};

export type objectColorLtmStim = {
  type: "objectColorLtmStim";
  object: coloredObject;
};

export type ltm_stimuli = (wordPairLtmStim | objectColorLtmStim)[];

type PairStimMap<T> = T extends word
  ? wordPairStim
  : T extends coloredObject
  ? objectColorStim
  : never;

type LtmStimMap<T> = T extends word
  ? wordPairLtmStim
  : T extends coloredObject
  ? objectColorLtmStim
  : never;

function isWord(obj: any): obj is word {
  return typeof obj === "object" && "word" in obj;
}

function isColoredObject(obj: any): obj is coloredObject {
  return typeof obj === "object" && "object" in obj;
}

export function isWordArray(arr: any[]): arr is word[] {
  return arr.every((item) => item && typeof item.word === "string");
}

export function isColoredObjectArray(arr: any[]): arr is coloredObject[] {
  return arr.every(
    (item) =>
      item &&
      typeof item.filePath === "string" &&
      typeof item.rotationAngle === "number"
  );
}

export function isWordPairStimArray(arr: any[]): arr is wordPairStim[] {
  return arr.every(
    (item) =>
      item &&
      item.type === "wordPairStim" &&
      Array.isArray(item.words) &&
      isWordArray(item.words)
  );
}

export function isObjectColorStimArray(arr: any[]): arr is objectColorStim[] {
  return arr.every(
    (item) =>
      item &&
      item.type === "objectColorStim" &&
      Array.isArray(item.objects) &&
      isColoredObjectArray(item.objects)
  );
}

export type wordStims = {
  wm_stimuli: wordPairStim[];
  ltm_stimuli: wordPairLtmStim[];
};

export const generateStims = <T extends word | coloredObject>(
  words: T[],
  group_size: number = 5,
  num_ltm_stimuli = 5,
  word_frequency_map: Map<T, number>
): {
  wm_stimuli: PairStimMap<T>[];
  ltm_stimuli: LtmStimMap<T>[];
} => {
  words = shuffle(words);

  let wm_stimuli: PairStimMap<T>[] = [];
  let ltm_stimuli: LtmStimMap<T>[] = [];

  if (isWordArray(words)) {
    const { word_stim_array, ltm_stim_array } = generateWordStims(
      words,
      group_size,
      num_ltm_stimuli,
      word_frequency_map as Map<word, number>
    );
    wm_stimuli = word_stim_array as PairStimMap<T>[];
    ltm_stimuli = ltm_stim_array as LtmStimMap<T>[];
  } else if (isColoredObjectArray(words)) {
    const { word_stim_array, ltm_stim_array } = generateColoredObjectStims(
      words,
      group_size,
      num_ltm_stimuli,
      word_frequency_map as Map<coloredObject, number>
    );

    wm_stimuli = word_stim_array as PairStimMap<T>[];
    ltm_stimuli = ltm_stim_array as LtmStimMap<T>[];
  }

  console.log(wm_stimuli);
  console.log(ltm_stimuli);

  return { wm_stimuli: wm_stimuli, ltm_stimuli };
};

const generateWordStims = (
  words: word[],
  group_size: number = 5,
  num_ltm_stimuli = 5,
  wordFrequencyMap: Map<word, number>
): {
  word_stim_array: wordPairStim[];
  ltm_stim_array: wordPairLtmStim[];
} => {


  let word_stim_array: Array<wordPairStim> = Array.from({
    length: num_ltm_stimuli,
  }).map((_, __) => ({
    type: "wordPairStim",
    words: [],
  }));

  for (const [word, frequency] of wordFrequencyMap) {
    for (let i = 0; i < frequency; i++) {
      if (i > word_stim_array.length) {
        throw new Error("Word frequency is greater than the number of stimuli");
      } else {
        word_stim_array[i % word_stim_array.length].words.push(word);
      }
    }
  }

  words = words.filter((w) => !wordFrequencyMap.has(w));

  for (let i = 0; i < num_ltm_stimuli; i++) {
    const remainingWordsNeeded = group_size - word_stim_array[i].words.length;
    const sliced_words = words.splice(0, remainingWordsNeeded);
    word_stim_array[i].type = "wordPairStim";
    word_stim_array[i].words.push(...sliced_words);
  }

  word_stim_array = word_stim_array.map((w) => ({
    ...w,
    words: shuffle(w.words),
  }));

  word_stim_array = shuffle(word_stim_array);

  const used_words: word[] = shuffle(word_stim_array.flatMap((w) => w.words));
  const unused_words: word[] = shuffle(
    words.filter((w) => !used_words.includes(w))
  );

  let ltm_stim_array: wordPairLtmStim[] = [];

  for (let i = 0; i < num_ltm_stimuli; i++) {
    let first_array: ("new_first" | "probe_first")[] = [
      "new_first",
      "probe_first",
    ];
    ltm_stim_array.push({
      type: "wordPairLtmStim",
      probe_word: used_words.pop()!!,
      new_word: unused_words.pop()!!,
      order: shuffle(first_array)[0],
    });
  }

  return { word_stim_array, ltm_stim_array };
};

const generateColoredObjectStims = (
  coloredObjects: coloredObject[],
  group_size: number = 5,
  num_ltm_stimuli = 5,
  wordFrequencyMap: Map<coloredObject, number>
): {
  word_stim_array: objectColorStim[];
  ltm_stim_array: objectColorLtmStim[];
} => {
  

  let word_stim_array: Array<objectColorStim> = Array.from({
    length: num_ltm_stimuli,
  }).map((_, __) => ({
    type: "objectColorStim",
    objects: [],
  }));

  for (const [word, frequency] of wordFrequencyMap) {
    for (let i = 0; i < frequency; i++) {
      if (i > word_stim_array.length) {
        throw new Error("Word frequency is greater than the number of stimuli");
      } else {
        word_stim_array[i % word_stim_array.length].objects.push(word);
      }
    }
  }

  coloredObjects = coloredObjects.filter((w) => !wordFrequencyMap.has(w));

  for (let i = 0; i < num_ltm_stimuli; i++) {
    const remainingWordsNeeded = group_size - word_stim_array[i].objects.length;
    const sliced_words = coloredObjects.splice(0, remainingWordsNeeded);
    word_stim_array[i].type = "objectColorStim";
    word_stim_array[i].objects.push(...sliced_words);
  }

  word_stim_array = word_stim_array.map((w) => ({
    ...w,
    words: shuffle(w.objects),
  }));

  word_stim_array = shuffle(word_stim_array);

  const used_words: coloredObject[] = shuffle(
    word_stim_array.flatMap((w) => w.objects)
  );
  const unused_words: coloredObject[] = shuffle(
    coloredObjects.filter((w) => !used_words.includes(w))
  );

  let ltm_stim_array: objectColorLtmStim[] = [];

  for (let i = 0; i < num_ltm_stimuli; i++) {
    let first_array: ("new_first" | "probe_first")[] = [
      "new_first",
      "probe_first",
    ];
    ltm_stim_array.push({
      type: "objectColorLtmStim",
      object: used_words.pop()!!,
    });
  }

  return { word_stim_array, ltm_stim_array };
};
