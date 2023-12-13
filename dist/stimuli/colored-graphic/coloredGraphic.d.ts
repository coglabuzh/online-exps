type Props = {
    /** Link to image */
    graphic: string;
    /** Color in which the image should be colored */
    color: string;
    /** Width of stimulus */
    width: number;
    /** Height of stimulus */
    height: number;
    /** Can listen to colors sent by other stimuli. The location here is the same as the source stimuli's window location. */
    listenLocation?: string;
};
/**
 * Display a graphic (preferably SVG) that gets colored with the specified color
 * @returns string of html source code
 */
export declare const coloredGraphic: (props: Props) => string;
export default coloredGraphic;
