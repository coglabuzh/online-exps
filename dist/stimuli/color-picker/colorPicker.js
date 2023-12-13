"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorPicker = void 0;
const utils_1 = require("../utils");
const webComponent_1 = require("./webComponent");
/**
 * Displays a color wheel where the user can select a certain color.
 * Start of range is stored in window.color_picker__result
 * @returns string of html source code
 */
const colorPicker = (props) => {
    var _a, _b, _c;
    new webComponent_1.default();
    return (0, utils_1.html) `<color-picker
    thickness=${(_a = props.thickness) !== null && _a !== void 0 ? _a : 10}
    radius=${(_b = props.radius) !== null && _b !== void 0 ? _b : 10}

  >
    ${(_c = props.content) !== null && _c !== void 0 ? _c : "<div></div>"}
  </color-picker>`;
};
exports.colorPicker = colorPicker;
exports.default = exports.colorPicker;
