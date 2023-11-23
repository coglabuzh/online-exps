import { JsPsych } from "jspsych";
interface blurObject {
    TRACK: boolean;
    MAX_BLUR: number;
    nBLUR: number;
    FAILED_ATTENTION_CHECK: boolean;
}
/** Contro the browser interactions
 *
 * This function is used to control the number of blurs and to end the experiment if the user has left the tab too often.
 *
 * If you want to use this function, you have to defined a global variable with the name blur.nBlur and varSystem.MAX_BLUR.
 *
 * @param {blurObject} blur An object that has to include variables of `START_COUNT`, `MAX_BLUR` and `nBlur`.
 * @param {string} code A string that is used to redirect the participant to the Prolific website.
 * @param alert A boolean value.
 */
export declare function trackInteractions(blur: blurObject, alert: boolean, jsPsych: JsPsych): void;
export {};
