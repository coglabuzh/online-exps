import { shuffle } from "@coglabuzh/webpsy.js";

export type word = {
  word: string;
};

export type wordPairStim = {
  type: "wordPairStim",
  words: word[];
};

export type objectColorStim = {
  type: "objectColorStim";
  object: string;
  color: string;
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
  probe_stim: objectColorStim;
  new_stim: objectColorStim;
  order: "probe_first" | "new_first";
};

export type ltm_stimuli = (wordPairLtmStim | objectColorLtmStim)[];


export const generateStims = (
  words: word[],
  group_size: number = 5,
  num_ltm_stimuli = 5
) => {
  words = shuffle(words);

  let word_stim_array: wordPairStim[] = [];

  for (let i = 0; i < num_ltm_stimuli; i++) {
    const sliced_words = words.splice(0, group_size);
    word_stim_array.push({
      type: "wordPairStim",
      words: sliced_words,
    });
  }

  const wm_stimuli = word_stim_array
  

  const used_words: word[] = shuffle(word_stim_array.flatMap(w => w.words))
  const unused_words: word[] = shuffle(words.filter(w => !used_words.includes(w)))

  let ltm_stim_array: wordPairLtmStim[] = []

  for (let i = 0; i < num_ltm_stimuli; i++) {
    let first_array: ("new_first" | "probe_first")[] = ["new_first", "probe_first"]
    ltm_stim_array.push({
      type: "wordPairLtmStim",
      probe_word: used_words.pop()!!,
      new_word: unused_words.pop()!!,
      order: shuffle(first_array)[0]
    });
  }

  const ltm_stimuli = ltm_stim_array
  
  console.log(wm_stimuli)
  console.log(ltm_stimuli)

  return {wm_stimuli: wm_stimuli, ltm_stimuli}


};
