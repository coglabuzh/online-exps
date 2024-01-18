import { Frame, Border } from "./arrangeTypes";
type Props = {
    stimuli: Frame[];
    centre: [number, number];
    radius: number;
    border: Border | Border[];
    start_position?: number;
    rotateDegrees?: number;
};
/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */
export declare const arrangeInCircle: (props: Props) => string;
export default arrangeInCircle;
