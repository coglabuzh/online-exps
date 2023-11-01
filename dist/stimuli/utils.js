"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDegreeToRadian = exports.convertRgbToHex = exports.html = void 0;
// ensures that html strings get syntax highlighting and formatting with prettier
exports.html = String.raw;
function convertRgbToHex(r, g, b) {
    const red = r.toString(16).padStart(2, "0");
    const green = g.toString(16).padStart(2, "0");
    const blue = b.toString(16).padStart(2, "0");
    return `#${red}${green}${blue}`;
}
exports.convertRgbToHex = convertRgbToHex;
function convertDegreeToRadian(deg) {
    return (deg * Math.PI) / 180;
}
exports.convertDegreeToRadian = convertDegreeToRadian;
