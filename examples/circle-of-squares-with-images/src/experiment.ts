/**
 * @title basic
 * @description
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
// import "../styles/main.scss";

import "jspsych/css/jspsych.css";

// import { circleOfSquares } from "../../../src/stimuli/circle_of_squares/circle_of_squares";

import {
  HtmlButtonResponseTrialData,
  circleOfSquares,
  colorPicker,
} from "@coglabuzh/webpsy.js";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  const jsPsych = initJsPsych();

  const timeline: any[] = [];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  // create stimulus from images in /assets
  const frames = Array(8)
    .fill("")
    .map((_, i) => ({
      content: `<img style="object-fit: cover; width: 100%; height: 100%" src="assets/img${
        // images are numbered from 1
        i + 1
      }.jpeg" />`,
    }));



  timeline.push({
    type: HtmlButtonResponsePlugin,

    stimulus: circleOfSquares({
      frames: frames,
      radius: 400,
      width: 200,
      height: 200,
    }),
    choices: [],
    on_load: function () {
      // Add an event listener for a click
      document.addEventListener("click", jsPsych.finishTrial);
    },
    on_finish: (
      data: HtmlButtonResponseTrialData & { response_button: string }
    ) => {
      // Add reponse (which button was pressed) to experiment data
      data.response_button = window["circle_of_squares__result"];
      // Remove the event listener to avoid any unintended side-effects in subsequent trials
      document.removeEventListener("click", jsPsych.finishTrial);
    },
  });

  timeline.push({
    type: HtmlKeyboardResponsePlugin,

    stimulus: () =>
      `You selected: ${
        jsPsych.data.getLastTrialData().last(1).values()[0]["response_button"]
      }`,
  });

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
