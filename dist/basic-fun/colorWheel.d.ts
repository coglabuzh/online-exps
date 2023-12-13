/** A function that draws a color wheel on a canvas
 *
 * @author Chenyu Li, ChatGPT
 *
 * @param radius The radius of the color wheel
 * @param ratio The ratio of the inner radius to the outer radius
 * @param pos The center position of the color wheel
 * @returns A object of color wheel that can be used in jsPsych psychophysics plugin
 */
export declare function drawColorWheel(radius: number, ratio: number, pos: [number, number]): {
    obj_type: string;
    startX: number;
    startY: number;
    drawFunc: (stimulus: any, canvas: any, context: any) => void;
};
