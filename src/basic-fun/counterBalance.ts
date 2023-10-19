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

// Basic functions
import { random } from "./random"

// Third party plugins
import Swal from "sweetalert2";

// Global variables
import { jsPsych } from "../jsp";


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
export function initBatchSession(conditionList:any[], maxSubjectNumber:number) {

	//@ts-ignore get the batch session data
	let batchSessionData = jatos.batchSession.getAll();

	// Check if the batch session is already initialized
	if (Object.keys(batchSessionData).length < 5) {

		let progressingCount = {};
		let completedCount = {};

		conditionList.forEach((condition) => {
			progressingCount[condition] = 0;
			completedCount[condition] = 0;
		});

		batchSessionData = {
			// create a new object to count the number of progressing subjects
			progressingCount: progressingCount,
			// create a new object to count the number of completed subjects
			completedCount: completedCount,
			// create a new object to store the progressing subjects
			progressingSubjects: {},
			// create a new object to store the completed subjects
			completedSubjects: {},
			// create a new object to store the failed subjects
			failedSubjects: {},
		}
		
	}

	//@ts-ignore get the result ID
	const resultID = jatos.studyResultId


	// assign a condition to the current subject
	const condition = assignCondition(conditionList, maxSubjectNumber, batchSessionData);

	// if the condition is undefined, it means that the maximum number of subjects has been reached.
	if (condition === undefined) {
		Swal.fire({
			icon: "error",
			title: "No position left",
			text: `
				  Unfortunately, the maximum number of subjects has been reached.
				  Please contact the researcher for help.
				  `,
			showConfirmButton: true,
		  });
  
		jsPsych.endExperiment();
		//@ts-ignore
		jatos.endStudy();
	}

	// create a new object to store the information of the current subject
	let subjectData = {
		condition: condition,
        startTime: new Date(),
        endTime: null,
	}

	// add the subject data to the progressing subjects
	batchSessionData.progressingSubjects[resultID] = subjectData;

	// update the progressing count
	batchSessionData.progressingCount[condition] += 1;

	//@ts-ignore initialize the batch session
	jatos.batchSession.setAll(batchSessionData);
	

	return condition;

};


/** 
 * Assign a condition to the current subject.
 * 
 * @param conditionList 
 * @param maxSubjectNumber 
 * @returns 
 */
function assignCondition(conditionList:any[], maxSubjectNumber:number, batchSessionData:object) {

	//@ts-ignore get the batch session data
	let { progressingCount, completedCount } = batchSessionData;

	// Check if the sum of progressing subjects and completed subjects 
	// is less than the maximum number of subjects.
	let availableConditionList:any[] = [];
	conditionList.forEach((condition) => {
		if (progressingCount[condition] + completedCount[condition] < maxSubjectNumber) {
			availableConditionList.push(condition);
		}
	});

	if (availableConditionList.length === 0) {
		return undefined;
	} else {
		// randomly select a condition from the available condition list
		const condition = random.sample(availableConditionList, 1)[0];
		return condition;
	}
}

export function endBatchSession(status:string) {

	//@ts-ignore get the batch session data
	const batchSessionData = jatos.batchSession.getAll();

	console.log(batchSessionData);
	
	//@ts-ignore get the result ID
	const resultID = jatos.studyResultId

	console.log(resultID);
	//get the condition
	const condition = batchSessionData.progressingSubjects[resultID].condition

	console.log(condition);

	//update the time
	batchSessionData.progressingSubjects[resultID].endTime = new Date();
	//update the number of progressing subjects and the number of completed subjects
	batchSessionData.progressingCount[condition] -= 1;
	if (status === "completed") batchSessionData.completedCount[condition] += 1;


	// move the subject to the completed subjects or failed subjects
	if (status === "completed") {
		batchSessionData.completedSubjects[resultID] = batchSessionData.progressingSubjects[resultID];
	} else {
		batchSessionData.failedSubjects[resultID] = batchSessionData.progressingSubjects[resultID];
	}

	// delete the progressing subjects
	delete batchSessionData.progressingSubjects[resultID];

	//@ts-ignore update the batch session
	jatos.batchSession.setAll(batchSessionData);
}