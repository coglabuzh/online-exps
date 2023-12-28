"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coloredGraphic = void 0;
const utils_1 = require("../utils");
const webComponent_1 = require("./webComponent");
/**
 * Display a graphic (preferably SVG) that gets colored with the specified color
 * @returns string of html source code
 */
const coloredGraphic = (props) => {
    var _a, _b;
    new webComponent_1.default();
    console.log("this");
    return (0, utils_1.html) `
    <colored-graphic
      graphic=${'"' + props.graphic + '"'}
      color=${props.color}
      width=${props.width}
      height=${props.height}
      listenLocation=${props.listenLocation
        ? '"' + props.listenLocation + '"'
        : '""'}
      cielab=${(_a = props.cielab) !== null && _a !== void 0 ? _a : false}
      cielabRotate=${(_b = props.cielabRotate) !== null && _b !== void 0 ? _b : 0}
    >
    </colored-graphic>
  `;
};
exports.coloredGraphic = coloredGraphic;
exports.default = exports.coloredGraphic;
