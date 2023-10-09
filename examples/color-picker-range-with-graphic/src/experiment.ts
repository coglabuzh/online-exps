/**
 * @title basic
 * @description
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";


import {circleOfSquares, coloredGraphic, colorPickerRange, colorPicker} from '@coglabuzh/webpsy.js'
import { BaseTrialData, HtmlKeyboardResponseTrialData } from "@coglabuzh/webpsy.js";
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
    // response_ends_trial: false,
    stimulus: colorPickerRange({
      radius: 200,
      thickness: 30,
      content: coloredGraphic({
        graphic: "assets/image.svg",
        color: "#19C1BE",
        width: 200,
        height: 200,
        listenLocation: "color_picker_range__result_end",
      }),
    }),
    trial_duration: 500000,
    on_finish: (data: HtmlKeyboardResponseTrialData) => {
      // console.log(window.color_picker__result)

      console.log(data);
    },
  });


  

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
