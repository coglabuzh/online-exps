import {HtmlButtonResponseTrialData} from "@coglabuzh/webpsy.js"
import { wordPairStim, objectColorStim, wordPairLtmStim, objectColorLtmStim } from "../trials/trialStim"

export const writeData = (data: HtmlButtonResponseTrialData, trial_vars: wordPairStim | objectColorStim | wordPairLtmStim | objectColorLtmStim) => {
	data["trial_vars"] = trial_vars;

	if(trial_vars.type === "wordPairLtmStim"){
		console.log(data.response)
		data["correct"] = trial_vars.order === "probe_first" ? data.response === 0 : data.response === 1
	}

	console.log(data)
}