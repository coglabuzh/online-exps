/**
 * Properties set here are inserted at the right positions in the HTML code of the consent screen.
 */
type Props = {
    /** Title of experiment */
    description: string;
    /** Name of researcher */
    researcher: string;
    /** Email of researcher */
    email: string;
    /** Duration of experiment in minutes */
    duration: number;
};
/**
 * Displays consent screen.
 * @returns string of html source code
 */
export declare const consentScreen: (props: Props) => string;
export default consentScreen;
