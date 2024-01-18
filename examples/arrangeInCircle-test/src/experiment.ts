/**
 * @title basic
 * @description
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
// import "../styles/main.scss";

// import { circleOfSquares } from "../../../src/stimuli/circle_of_squares/circle_of_squares";

import { colorPicker, coloredGraphic } from "@coglabuzh/webpsy.js";

import { convertTime, countDownTimer } from "../../../dist/index";
import { varSystem } from "./settings";
import { HtmlKeyboardResponseTrialData } from "@coglabuzh/webpsy.js";

import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";
import { createNewTrial } from "./trials/trialProcess";

import {
  generateMathEquation,
  arrangeInCircle,
  arrangeInLine,
} from "@coglabuzh/webpsy.js";
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

  const trial_start_screen = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: `<div class="fb-text">
    <p>The next trial will start in <span id="clock" style="color:red">10</span> seconds.</p>
    <p>Press the "Space bar" to start directly.</p>
    <br>
    <br>
  </div>`,
    choices: ["Hello", " "], // The only valid key response is the space bar.
    trial_duration: 10000, // Time to wait before automatically proceeding with the next trial.
    post_trial_gap: 300, // forced inter-trial interval after participant's response.
    on_load: function () {
      let time = convertTime(10000, "ms", "s");
      //@ts-ignore
      countDownTimer(time, "clock", jsPsych);
    },
    on_finish: function () {},
  };

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  console.log(generateMathEquation(3, 2, "difficult", true, true));
  console.log(convertTime(10000, "ms", "s"));

  const trial = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: arrangeInCircle({
      stimuli: [
        {
          type: "image",
          imagePath: "https://picsum.photos/200",
          width: 300,
          angle: 123,
          clickable: true,
          background: "red",
        },
        {
          type: "image",
          imagePath: "https://picsum.photos/200",
          width: 300,
          angle: 123,
          clickable: true,
          background: "red",
        },
        {
          type: "image",
          imagePath: "https://picsum.photos/200",
          width: 300,
          angle: 123,
          clickable: true,
          background: "red",
        },
        {
          type: "image",
          imagePath: "https://picsum.photos/200",
          width: 300,
          angle: 123,
          clickable: true,
          background: "red",
        },
        {
          type: "rectangle",
          width: 305,
          height: 200,
          angle: 123,
          fillColor: "red",
          lineColor: "blue",
        },
        {
          type: "rectangle",
          width: 305,
          height: 200,
          angle: 123,
          fillColor: "red",
          lineColor: "blue",
        },
        {
          type: "text",
          content: "abc",
        },
      ],
      centre: [0, 0],
      radius: 350,
      border: { lineWidth: 5, lineColor: "red", lineType: "dashed" },
      start_position: 2,
      rotateDegrees: 45,
    }),

    choices: ["Hello", " "], // The only valid key response is the space bar.
    // trial_duration: 10000, // Time to wait before automatically proceeding with the next trial.
    post_trial_gap: 300, // forced inter-trial interval after participant's response.

    on_finish: function () {},
  };

  const trialLine = {
    type: HtmlKeyboardResponsePlugin,
    stimulus:
      "<div>hello world</div>" +
      arrangeInLine({
        stimuli: [],

        border: { lineWidth: 5, lineColor: "red", lineType: "dashed" },
      }),

    choices: ["Hello", " "], // The only valid key response is the space bar.
    // trial_duration: 10000, // Time to wait before automatically proceeding with the next trial.
    post_trial_gap: 300, // forced inter-trial interval after participant's response.

    on_finish: function () {},
  };

  timeline.push(trial);

  timeline.push(trial_start_screen);

  // timeline.push(...createNewTrial())

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
