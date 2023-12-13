"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consentScreen = void 0;
const utils_1 = require("../utils");
/**
 * Displays consent screen.
 * @returns string of html source code
 */
const consentScreen = (props) => {
    const consent_html = (0, utils_1.html) `<style>
    input[type=checkbox] {
      zoom: 2;
      transform:  scale(1);
      -moz-transform:  scale(1.5);
    }
  
    input[type='number'] {
      font-size: 1em;
      width: 5em;
    }
</style>

<div id=consent class="main">
    <h1 class="title">Study information and informed consent</h1>
    <p class="body-center">Please read the following information carefully.</p>
    <h2 class="subtitle"> What this study is about</h2>
    <p class="body-left">
        ${props.description}</p>
    <h2 class="subtitle">Conditions of participation</h2>
    <p class="body-left">Your participation in this study is completely <strong> voluntary</strong>.
        You may withdraw your consent to participate at any time without stating any reason.
        To quit the experiment, you simply have to close this browser window.</p>

    <h2 class="subtitle"> Who can participate? </h2>
    <p class="body-left">English native speakers aged between 18 and 35 years.</p>
    <h2 class="subtitle">Duration and compensation</h2>
    This experiment will take ca. ${props.duration} min to complete. If you complete the experiment,
    you will receive your compensation through Prolific. 
    </p>
    <h2 class="subtitle">Possible risks and harms:</h2>
    No risks and harms are known to be caused by this experiment. 
    <h2 class="subtitle">Confidentiality and anonymity</h2>
    <p class="body-left">Your anonymity will always be preserved.
    As no personal data will be stored permanently, your data and your person cannot be
    connected after data collection.
    Respectively, deletion of your data will not be possible after data collection has been
    completed, as we cannot retrace your data-set.
    The results and anonymized data collected in this study will be published as a scientific publication
    and will be made available to other researchers
    and/or in a data archive on the Internet
    as a means of transparency and to enable subsequent re-use in science.
    This will happen in an anonymized format, so that no data can be
    traced back to a specific person. </p>
    <p style = "font-size: 90%; color:grey">
        For further questions please contact: ${props.researcher} (${props.email}), University of Zurich,
    Switzerland.
    </p>
    <p>
        <input type="checkbox" id="checkbox1" />
        I confirm that I read and understood the study information. <br>
        <input type="checkbox" id="checkbox2" />
        I know that participation in this experiment is voluntary and that I can withdraw at any time.<br>
        <input type="checkbox" id="checkbox3" />
        I confirm that I am at least 18 years old and I want to participate in this experiment.<br>
        <input type="checkbox" id="checkbox4" />
        I confirm that I am able to work concentrated for the next 45 minutes without any distractions.
    </p>

    <h2 class="subtitle">Prolific ID</h2>
    <p>
        Please type in your Prolific-ID here: 
        <input type="text" class = "input-box" style="font-size: 1em" id="prolific_id"><br>
        <div style = "font-size: 90%; color:grey">
            This will only be used if there are any issues with your submission 
            and we need to associate your ID with your data. 
            We will delete your Prolific-ID permanently after the data collection is finished</div>
    </p>
    <br>

    <button type=button class="button" id=agree>Start Experiment</button>
</div>
	
	
	`;
    return consent_html;
};
exports.consentScreen = consentScreen;
exports.default = exports.consentScreen;
