"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circleOfSquares = void 0;
const utils_1 = require("./utils");
/**
 * display squares laid out in a circle
 * @returns string of html source code
 */
const circleOfSquares = (props) => {
    var _a, _b, _c, _d, _e, _f;
    const { frames } = props;
    const n = frames.length;
    const theta = (2 / n) * Math.PI;
    const radius = (_a = props.radius) !== null && _a !== void 0 ? _a : 200;
    let markup = (0, utils_1.html) `<div style="position: relative; width: 400px; height: 400px;">`;
    for (let i = 0; i < n; i++) {
        // Calculate the (x, y) coordinates of the current screen element.
        const offsetX = Math.sin(theta * (-2 - i)) * radius;
        const offsetY = Math.cos(theta * (-2 - i)) * radius;
        markup += (0, utils_1.html) `
      <div
        style="
			position: absolute;
			top: 50%; 
			left: 50%; 
			width: 100px; 
			height: 100px; 
			border: 4px solid ${(_b = frames[i].border_color) !== null && _b !== void 0 ? _b : "black"}; 
			color: ${(_c = frames[i].text_color) !== null && _c !== void 0 ? _c : "black"}; 
			background-color: ${(_d = frames[i].bg_color) !== null && _d !== void 0 ? _d : "white"}; 
			display: flex; 
			justify-content: center; 
			align-items: center; 
			transform: translate(${offsetX}px, ${offsetY}px); 
			${(_e = props.custom_css) !== null && _e !== void 0 ? _e : ""}
			${(_f = frames[i].custom_css) !== null && _f !== void 0 ? _f : ""}
			"
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
