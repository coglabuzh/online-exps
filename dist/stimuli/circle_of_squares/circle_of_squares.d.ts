type Frame = {
    /**  appears in each frame; text or html */
    content: string;
    border_color?: string;
    bg_color?: string;
    text_color?: string;
    custom_css?: string;
};
type Props = {
    frames: Frame[];
    border_color?: string;
    bg_color?: string;
    text_color?: string;
    custom_css?: string;
    radius?: number;
};
/**
 * display squares laid out in a circle
 * @returns string of html source code
 */
export declare const circleOfSquares: (props: Props) => string;
export default circleOfSquares;
