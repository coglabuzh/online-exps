/**
 * @title basic
 * @description
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

// import { circleOfSquares } from "../../../src/stimuli/circle_of_squares/circle_of_squares";

import {circleOfSquares,  colorPicker} from '@coglabuzh/webpsy.js'

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
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



  

  timeline.push({
    type: HtmlKeyboardResponsePlugin,
    response_ends_trial: false,

    stimulus: circleOfSquares({
      frames: [
        { content: "A" },
        { content: "B" },
        { content: "C" },
        { content: "D", border_color: "blue" },
        { content: "E" },
        { content: "F", bg_color: "yellow" },
        { content: "G", text_color: "red" },
        { content: "H", text_color: "red" },
      ],
      border_color: "green"
    }),
    trial_duration: 500000,
  });

 

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
