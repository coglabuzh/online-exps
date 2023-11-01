type Props = {
    /** Appears in the center of the color wheel; text or html */
    content?: string;
    /** Radius of color wheel */
    radius?: number;
    /** Thickness of color wheel */
    thickness?: number;
};
/**
 * Displays a color wheel where the user can select a certain color range.
 * Start of range is stored in window.color_picker_range__result_start and window.color_picker_range__result_end
 * @returns string of html source code
 */
export declare const colorPickerRange: (props: Props) => string;
export default colorPickerRange;
