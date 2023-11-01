"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calAngle = void 0;
/** Calculate the angle of the mouse relative to the center of the color wheel, range from 0 to 360
 *
 * @param mouseX: The x coordinate of the mouse
 * @param mouseY: The y coordinate of the mouse
 * @param centerX: The x coordinate of the center of the color wheel
 * @param centerY: The y coordinate of the center of the color wheel
 * @returns The angle of the mouse relative to the center of the color wheel, range from 0 to 360
 */
function calAngle(mouseX, mouseY, centerX, centerY) {
    var angle = Math.atan2(mouseY - centerY, mouseX - centerX);
    // Adjust for negative angles
    if (angle < 0) {
        angle = 360 + angle;
    }
    return angle;
}
exports.calAngle = calAngle;
