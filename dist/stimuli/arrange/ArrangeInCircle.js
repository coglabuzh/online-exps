"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrangeInCircle = void 0;
const utils_1 = require("../utils");
/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */
const arrangeInCircle = (props) => {
    var _a, _b, _c;
    const { stimuli, centre, radius, border, start_position } = props;
    const borderArray = Array.isArray(border)
        ? border
        : Array(stimuli.length).fill(border);
    const n = stimuli.length;
    const theta = (2 / n) * Math.PI;
    let markup = (0, utils_1.html) `<div
    style="position: relative; width: 100%; height: 100%"
  ></div>`;
    const defaultLocation = "circle_of_squares__result";
    const width = stimuli.map((stimulus) => {
        var _a, _b, _c;
        if (stimulus.type == "image") {
            return (_a = stimulus.width) !== null && _a !== void 0 ? _a : 100;
        }
        else if (stimulus.type == "text") {
            return 200;
        }
        else if (stimulus.type == "rectangle") {
            return (_b = stimulus.width) !== null && _b !== void 0 ? _b : 100;
        }
        else if (stimulus.type == "circle") {
            return (_c = stimulus.radius) !== null && _c !== void 0 ? _c : 100;
        }
    });
    const height = stimuli.map((stimulus) => {
        var _a, _b;
        if (stimulus.type == "image") {
            return 200;
        }
        else if (stimulus.type == "text") {
            return 200;
        }
        else if (stimulus.type == "rectangle") {
            return (_a = stimulus.height) !== null && _a !== void 0 ? _a : 100;
        }
        else if (stimulus.type == "circle") {
            return (_b = stimulus.radius) !== null && _b !== void 0 ? _b : 100;
        }
    });
    const getHTML = (stimulus, border, i, baseCSS) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        const response_function = `"window['${defaultLocation}'] = ${i}"`;
        if (stimulus.type == "image") {
            const width = (_a = stimulus.width) !== null && _a !== void 0 ? _a : 300;
            const height = 200;
            const offsetX = Math.sin(theta * (-2 - ((i + start_position) % stimuli.length))) *
                radius -
                width / 2;
            const offsetY = Math.cos(theta * (-2 - ((i + start_position) % stimuli.length))) *
                radius -
                height / 2;
            return (0, utils_1.html) `
        <div
          ${stimulus.clickable && "onclick=" + response_function}
          style="width: ${width}px;
        height: ${height}px;
        background-color: ${(_b = stimulus.background) !== null && _b !== void 0 ? _b : "transparent"};
        ${baseCSS}
        transform: translate(${offsetX}px, ${offsetY}px) ${stimulus.angle
                ? `rotate(${stimulus.angle}deg)`
                : ""};"
          aspect-ratio="${(_c = stimulus.ratio) !== null && _c !== void 0 ? _c : 1}"
        >
          <img src="${stimulus.imagePath}" style="width: 100%; height: 100%;" />
        </div>
      `;
        }
        if (stimulus.type == "text") {
            const width = 200;
            const height = 200;
            const offsetX = Math.sin(theta * (-2 - ((i + start_position) % stimuli.length))) *
                radius -
                (width !== null && width !== void 0 ? width : 100) / 2;
            const offsetY = Math.cos(theta * (-2 - ((i + start_position) % stimuli.length))) *
                radius -
                (height !== null && height !== void 0 ? height : 100) / 2;
            return (0, utils_1.html) `
        <div
          ${stimulus.clickable && "onclick=" + response_function}
          style="width: ${width}px;
            height: ${height}px;
            color: ${(_d = stimulus.color) !== null && _d !== void 0 ? _d : "black"};
      ${baseCSS}
            transform: translate(${offsetX}px, ${offsetY}px) ${stimulus.angle
                ? `rotate(${stimulus.angle}deg)`
                : ""};"
        >
          <div
            style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; font-size: ${(_e = stimulus.size) !== null && _e !== void 0 ? _e : 50}px; color: ${(_f = stimulus.color) !== null && _f !== void 0 ? _f : "black"}; font-family: ${(_g = stimulus.family) !== null && _g !== void 0 ? _g : "Arial"};   "
          >
            ${stimulus.content}
          </div>
        </div>
      `;
        }
        if (stimulus.type == "rectangle") {
            const width = (_h = stimulus.width) !== null && _h !== void 0 ? _h : 100;
            const height = (_j = stimulus.height) !== null && _j !== void 0 ? _j : 100;
            const offsetX = Math.sin(theta * (-2 - ((i + start_position) % stimuli.length))) *
                radius -
                (width !== null && width !== void 0 ? width : 100) / 2;
            const offsetY = Math.cos(theta * (-2 - ((i + start_position) % stimuli.length))) *
                radius -
                (height !== null && height !== void 0 ? height : 100) / 2;
            return (0, utils_1.html) `
        <div
          ${stimulus.clickable && "onclick=" + response_function}
          style="width: ${width}px;
            height: ${height}px;
            background-color: ${(_k = stimulus.fillColor) !== null && _k !== void 0 ? _k : "transparent"};
            border: ${(_l = stimulus.lineType) !== null && _l !== void 0 ? _l : "solid"} ${(_m = stimulus.lineWidth) !== null && _m !== void 0 ? _m : 1}px ${(_o = stimulus.lineColor) !== null && _o !== void 0 ? _o : "black"};

            transform: translate(${offsetX}px, ${offsetY}px) ${stimulus.angle
                ? `rotate(${stimulus.angle}deg)`
                : ""};
            ${baseCSS}
            
            "
        ></div>
      `;
        }
        if (stimulus.type == "circle") {
            const radius = (_p = stimulus.radius) !== null && _p !== void 0 ? _p : 100;
            const offsetX = Math.sin(theta * (-2 - ((i + start_position) % stimuli.length))) *
                radius -
                radius;
            const offsetY = Math.cos(theta * (-2 - ((i + start_position) % stimuli.length))) *
                radius -
                radius;
            return (0, utils_1.html) `
        <div
          ${stimulus.clickable && "onclick=" + response_function}
          style=" ${baseCSS};
          width: ${radius}px;
            height: ${radius}px;
            background-color: ${(_q = stimulus.fillColor) !== null && _q !== void 0 ? _q : "transparent"};
            border: ${(_r = stimulus.lineType) !== null && _r !== void 0 ? _r : "solid"} ${(_s = stimulus.lineWidth) !== null && _s !== void 0 ? _s : 1}px ${(_t = stimulus.lineColor) !== null && _t !== void 0 ? _t : "black"};
            border-radius: 50%;
             
            transform: translate(${offsetX}px, ${offsetY}px) ${stimulus.angle
                ? `rotate(${stimulus.angle}deg)`
                : ""};"
        ></div>
      `;
        }
    };
    for (let i = 0; i < n; i++) {
        // Calculate the (x, y) coordinates of the current screen element.
        const baseCSS = `position: absolute;
			top: 50%; 
			left: 50%; 
			border: ${(_a = borderArray[i].lineType) !== null && _a !== void 0 ? _a : "solid"} ${(_b = borderArray[i].lineWidth) !== null && _b !== void 0 ? _b : 1}px ${(_c = borderArray[i].lineColor) !== null && _c !== void 0 ? _c : "black"};
			display: flex; 
			justify-content: center; 
			align-items: center; 
			
      cursor: pointer;
			`;
        markup += getHTML(stimuli[i], borderArray[i], i, baseCSS);
    }
    markup += (0, utils_1.html) `</div>`;
    return markup;
};
exports.arrangeInCircle = arrangeInCircle;
exports.default = exports.arrangeInCircle;