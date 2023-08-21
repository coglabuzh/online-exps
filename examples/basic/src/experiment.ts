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

import {circleOfSquares} from '@coglabuzh/webpsy.js'

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

  // Welcome screen

  // timeline.push({
  //   type: HtmlKeyboardResponsePlugin,

  //   stimulus: `<circle-of-squares .frames="${[{ content: "s" }, { content: "a" }, { content: "a" }, { content: "b" }, { content: "c" }, { content: "hello" }, { content: "dddd" }, { content: "hello", text_color: "red" },]}" .onFrameClick="${(i) => console.log('Frame ' + i + ' clicked')}"></circle-of-squares>`,
  //   trial_duration: 500000
  // });

  timeline.push({
    type: HtmlKeyboardResponsePlugin,

    stimulus: circleOfSquares({
      frames: [
        { content: "a" },
        { content: "b" },
        { content: "b" },
        { content: "c" },
        { content: "hello" },
        { content: "dddd" },
        { content: "hello", text_color: "red" },
      ],
      bg_color: "yellow",
    }),
    trial_duration: 500000,
  });

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
