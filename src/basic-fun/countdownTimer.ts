import { JsPsych } from "jspsych";

interface switchObject {
  RUN_TIMER: boolean;
}

/**
 *
 * @param duration the duration of the countdown timer in seconds
 * @param displayElementId the ID of the HTML element where you want to display the timer
 */
export function countDownTimer(
  duration: number,
  displayElementId,
  jsPsych: JsPsych
) {
  // allow to run timer
  window["run_timer"] = true;

  if (jsPsych.getCurrentTrial().on_finish) {
    const previous_on_finish_function = jsPsych.getCurrentTrial().on_finish;

    // set window["run_timer"] to false at the end of the experiment so the timer stops
    jsPsych.getCurrentTrial().on_finish = () => {
      // execute original on_finish function first, then set false
      previous_on_finish_function(), (window["run_timer"] = false);
    };
  } else {
    jsPsych.getCurrentTrial().on_finish = () => {
      // execute original on_finish function first, then set false
      window["run_timer"] = false;
    };
  }

  var timer: number = parseInt(String(duration), 10); // Parse duration as an integer
  var minutes, seconds;

  var intervalId = setInterval(function () {
    if (!window["run_timer"]) {
      // Check the global variable to see if the timer should be stopped
      clearInterval(intervalId);
      return;
    }

    minutes = timer / 60;
    seconds = (timer % 60) - 1;

    minutes = minutes < 10 ? "0" + minutes : String(minutes);
    seconds = seconds < 10 ? "0" + seconds : String(seconds);

    const displayText = duration < 100 ? seconds : minutes + ":" + seconds;
    //@ts-ignore
    document.getElementById(displayElementId).textContent = displayText;

    if (--timer < 0) clearInterval(intervalId);
  }, 1000);
}
