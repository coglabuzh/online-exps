/**
 * @name counter balance functions
 *
 * @description We provide a range of features designed to simplify the setup of counterbalance experiments.
 * These features are built on the JATOS platform, utilizing its Batch Session for information storage.
 *
 * @tutorial
 * All these function could be used in the `initJsPsych` function.
 * 1. run the initBatchSession function at the beginning of the experiment (e.g., preload_screen, welcome_screen).
 * 2. run the endBatchSession function at the end of the experiment (on_finish function).
 *
 * @author Chenyu Li
 */
import { JsPsych } from "jspsych";
/**
 * Initialize the Batch Session.
 *
 * This function will assign a condition to the current subject and update the Batch Session.
 * If the maximum number of subjects has been reached, the function will end the study.
 *
 * @param conditionList
 * @param maxSubjectNumber
 * @returns
 */
export declare function initBatchSession(conditionList: any[], maxSubjectNumber: number, jsPsych: JsPsych): any;
export declare function endBatchSession(status: string): void;
