"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrangeElement = void 0;
const getHtml_1 = require("./getHtml");
/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */
const arrangeElement = (props) => {
    const { stimulus, position, border } = props;
    const genHtml = (0, getHtml_1.getHtml)({
        stimuli: [stimulus],
        border: border,
        positions: [position],
    });
    return genHtml;
};
exports.arrangeElement = arrangeElement;
exports.default = exports.arrangeElement;
