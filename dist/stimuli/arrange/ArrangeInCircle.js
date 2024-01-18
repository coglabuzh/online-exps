"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrangeInCircle = void 0;
const getHtml_1 = require("./getHtml");
/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */
const arrangeInCircle = (props) => {
    var _a;
    const { stimuli, centre, radius, border, start_position, rotateDegrees } = props;
    const n = stimuli.length;
    const theta = (2 / n) * Math.PI;
    const rotateRadians = (((_a = props.rotateDegrees) !== null && _a !== void 0 ? _a : 0) * Math.PI) / 180;
    const getPosition = (stimulus, i) => {
        var _a, _b, _c, _d;
        const angle = theta * (-2 - ((i + start_position) % stimuli.length)) - rotateRadians;
        if (stimulus.type == "image") {
            const width = (_a = stimulus.width) !== null && _a !== void 0 ? _a : 300;
            const height = 200;
            const offsetX = Math.sin(angle) * radius - width / 2;
            const offsetY = Math.cos(angle) * radius - height / 2;
            return [offsetX, offsetY];
        }
        if (stimulus.type == "text") {
            const width = 200;
            const height = 200;
            const offsetX = Math.sin(angle) * radius - (width !== null && width !== void 0 ? width : 100) / 2;
            const offsetY = Math.cos(angle) * radius - (height !== null && height !== void 0 ? height : 100) / 2;
            return [offsetX, offsetY];
        }
        if (stimulus.type == "rectangle") {
            const width = (_b = stimulus.width) !== null && _b !== void 0 ? _b : 100;
            const height = (_c = stimulus.height) !== null && _c !== void 0 ? _c : 100;
            const offsetX = Math.sin(angle) * radius - (width !== null && width !== void 0 ? width : 100) / 2;
            const offsetY = Math.cos(angle) * radius - (height !== null && height !== void 0 ? height : 100) / 2;
            return [offsetX, offsetY];
        }
        if (stimulus.type == "circle") {
            const radius = (_d = stimulus.radius) !== null && _d !== void 0 ? _d : 100;
            const offsetX = Math.sin(angle) * radius - radius;
            const offsetY = Math.cos(angle) * radius - radius;
            return [offsetX, offsetY];
        }
    };
    const positions = [];
    for (let i = 0; i < n; i++) {
        // Calculate the (x, y) coordinates of the current screen element.
        positions.push(getPosition(stimuli[i], i));
    }
    return (0, getHtml_1.getHtml)({ positions: positions, stimuli: stimuli, border: border });
};
exports.arrangeInCircle = arrangeInCircle;
exports.default = exports.arrangeInCircle;
