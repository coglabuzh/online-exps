import { generateStims } from "./trialStim";
import word_stimuli from "./wordlist";
import { circleOfSquares, shuffle } from "@coglabuzh/webpsy.js";
import { word } from "./trialStim";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";

import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import { HtmlButtonResponseTrialData } from "@coglabuzh/webpsy.js";
import { writeData } from "../task-fun/writeData";

import { expInfo } from "../../settings";

export const createNewTrial = () => {
  const words: word[] = word_stimuli.map((w) => ({ word: w.WORD }));

  const stimuli = generateStims(
    words,
    expInfo.DESIGN.nBLOCKS,
    expInfo.DESIGN.nTRIALS
  );

  let trial_list: any[] = [];

  for (const stim of stimuli.wm_stimuli) {
    const trials = stim.words.map((word) => {
      const trial = {
        type: HtmlKeyboardResponsePlugin,
        stimulus: `${word.word}`,
        prompt: "Memorize this word.",
        trial_duration: expInfo.TIMING.TRIAL_DURATION,
      };
      return trial;
    });

    trial_list.push(...trials);

    // todo: correct distraction task
    const distraction_task = {
      type: HtmlKeyboardResponsePlugin,
      stimulus: "",
      trial_duration: 5000,
      prompt: "Distraction Task Here",
      on_finish: (data: HtmlButtonResponseTrialData) => {
        writeData(data, stim);
      },
    };

    trial_list.push(distraction_task);
  }

  for (const stim of stimuli.ltm_stimuli) {
    const trial = {
      type: HtmlButtonResponsePlugin,
      stimulus: "",
      choices:
        stim.order === "probe_first"
          ? [stim.probe_word.word, stim.new_word.word]
          : [stim.new_word.word, stim.probe_word.word],
      trial_duration: 5000,
      prompt: "Select the word you have seen before.",
      on_finish: (data: HtmlButtonResponseTrialData) => {
        writeData(data, stim);
      },
    };

    trial_list.push(trial);
  }

  return trial_list;
};
