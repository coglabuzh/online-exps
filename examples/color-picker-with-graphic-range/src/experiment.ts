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

import {circleOfSquares, coloredGraphic, colorPickerRange} from '@coglabuzh/webpsy.js'

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */

type BaseTrialData = {
  trial_type: string,
  trial_index: number,
  time_elaped: number,
  internal_node_id: string
}

type KeyboardTrialData = BaseTrialData & {
  response: string,
  rt: number,
  stimulus: string
}


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
    // response_ends_trial: false,
    stimulus: colorPickerRange({
      radius: 20,
      thickness: 30,
      content: coloredGraphic({
        graphic: "assets/image.svg",
        color: "#19C1BE",
        width: 200,
        height: 200,
        // listenLocation: "color_picker__result",
      }),
    }),
    trial_duration: 500000,
    on_finish: (data: KeyboardTrialData) => {
      // console.log(window.color_picker__result)
      console.log(data);
    },
  });


  // coloredGraphic({
  //     graphic: "assets/image.svg",
  //     color: "#19C1BE",
  //     width: 200,
  //     height: 200,
  //   }),}),
  

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
