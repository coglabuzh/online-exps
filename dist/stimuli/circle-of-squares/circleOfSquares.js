"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circleOfSquares = void 0;
const utils_1 = require("../utils");
/**
 * Display squares laid out in a circle.
 * @returns string of html source code
 */
const circleOfSquares = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const { frames } = props;
    const n = frames.length;
    const theta = (2 / n) * Math.PI;
    const radius = (_a = props.radius) !== null && _a !== void 0 ? _a : 200;
    let markup = (0, utils_1.html) `<div
    style="position: relative; width: 100%; height: 100%"
  ></div>`;
    const defaultLocation = 'circle_of_squares__result';
    for (let i = 0; i < n; i++) {
        const response_function = `window['${defaultLocation}'] = ${i}`;
        // Calculate the (x, y) coordinates of the current screen element.
        const offsetX = (Math.sin(theta * (-2 - i)) * radius) - ((_c = (_b = frames[i].width) !== null && _b !== void 0 ? _b : props.width) !== null && _c !== void 0 ? _c : 100) / 2;
        const offsetY = Math.cos(theta * (-2 - i)) * radius -
            ((_e = (_d = frames[i].height) !== null && _d !== void 0 ? _d : props.height) !== null && _e !== void 0 ? _e : 100) / 2;
        markup += (0, utils_1.html) `
      <div
        style="
			position: absolute;
			top: 50%; 
			left: 50%; 
			width: ${(_g = (_f = frames[i].width) !== null && _f !== void 0 ? _f : props.width) !== null && _g !== void 0 ? _g : 100}px; 
			height: ${(_j = (_h = frames[i].height) !== null && _h !== void 0 ? _h : props.height) !== null && _j !== void 0 ? _j : 100}px; 
			border: 4px solid ${(_l = (_k = frames[i].border_color) !== null && _k !== void 0 ? _k : props.border_color) !== null && _l !== void 0 ? _l : "black"}; 
			color: ${(_m = frames[i].text_color) !== null && _m !== void 0 ? _m : "black"}; 
			background-color: ${(_p = (_o = frames[i].bg_color) !== null && _o !== void 0 ? _o : props.bg_color) !== null && _p !== void 0 ? _p : "white"}; 
			display: flex; 
			justify-content: center; 
			align-items: center; 
			transform: translate(${offsetX}px, ${offsetY}px);
      cursor: pointer;
			${(_q = props.custom_css) !== null && _q !== void 0 ? _q : ""};
			${(_r = frames[i].custom_css) !== null && _r !== void 0 ? _r : ""}
			"
        onclick="${response_function}"
      >
        ${frames[i].content}
      </div>
    `;
    }
    markup += (0, utils_1.html) `</div>`;
    return markup;
};
exports.circleOfSquares = circleOfSquares;
exports.default = exports.circleOfSquares;
