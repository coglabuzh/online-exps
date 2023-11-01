/**
 * Array with one object per frame. Properties set here overwrite the general properties with the same name.
 */
type Frame = {
    /** Appears in each frame; text or html */
    content: string;
    /** Border color of the frame */
    border_color?: string;
    /** Background color of the frame */
    bg_color?: string;
    /** Text color inside the frame */
    text_color?: string;
    /** Width of the frame in px */
    width?: number;
    /** Height of the frame in px */
    height?: number;
    /** Custom CSS for the frame (file issue if frequently needed) */
    custom_css?: string;
};
/**
 * Properties set here apply for all Frames, can be overwritten by properties in the frames array.
 */
type Props = {
    /** Array of frames */
    frames: Frame[];
    /** Border color of the props */
    border_color?: string;
    /** Background color of the props */
    bg_color?: string;
    /** Text color inside the props */
    text_color?: string;
    /** Width of the frame in px */
    width?: number;
    /** Height of the frame in px */
    height?: number;
    /** Custom CSS for the props (file issue if frequently needed) */
    custom_css?: string;
    /** Radius of the circle */
    radius?: number;
};
/**
 * Display squares laid out in a circle.
 * @returns string of html source code
 */
export declare const circleOfSquares: (props: Props) => string;
export default circleOfSquares;
