"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrangeInLine = void 0;
const getHtml_1 = require("./getHtml");
/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */
const arrangeInLine = (props) => {
    const { stimuli, centre, radius, border, start_position } = props;
    const n = stimuli.length;
    const theta = (2 / n) * Math.PI;
    const getPosition = (stimulus, i) => {
        var _a, _b, _c, _d;
        if (stimulus.type == "image") {
            const width = (_a = stimulus.width) !== null && _a !== void 0 ? _a : 300;
            const height = 200;
            const offsetX = Math.sin(theta * (-2 - i)) * radius - width / 2;
            const offsetY = Math.cos(theta * (-2 - i)) * radius - height / 2;
            return [offsetX, offsetY];
        }
        if (stimulus.type == "text") {
            const width = 200;
            const height = 200;
            const offsetX = Math.sin(theta * (-2 - i)) * radius - (width !== null && width !== void 0 ? width : 100) / 2;
            const offsetY = Math.cos(theta * (-2 - i)) * radius - (height !== null && height !== void 0 ? height : 100) / 2;
            return [offsetX, offsetY];
        }
        if (stimulus.type == "rectangle") {
            const width = (_b = stimulus.width) !== null && _b !== void 0 ? _b : 100;
            const height = (_c = stimulus.height) !== null && _c !== void 0 ? _c : 100;
            const offsetX = Math.sin(theta * (-2 - i)) * radius - (width !== null && width !== void 0 ? width : 100) / 2;
            const offsetY = Math.cos(theta * (-2 - i)) * radius - (height !== null && height !== void 0 ? height : 100) / 2;
            return [offsetX, offsetY];
        }
        if (stimulus.type == "circle") {
            const radius = (_d = stimulus.radius) !== null && _d !== void 0 ? _d : 100;
            const offsetX = Math.sin(theta * (-2 - i)) * radius - radius;
            const offsetY = Math.cos(theta * (-2 - i)) * radius - radius;
            return [offsetX, offsetY];
        }
    };
    const positions = [];
    for (let i = 0; i < n; i++) {
        // Calculate the (x, y) coordinates of the current screen element.
        positions.push(getPosition(stimuli[i], i));
    }
    return (0, getHtml_1.getHtml)({ stimuli, border, positions });
};
exports.arrangeInLine = arrangeInLine;
exports.default = exports.arrangeInLine;
