import { Frame, Border } from "./arrangeTypes";
type Props = {
    stimulus: Frame;
    position: [number, number];
    border: Border;
};
/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */
export declare const arrangeElement: (props: Props) => string;
export default arrangeElement;
