import { Frame, Border } from "./arrangeTypes";
type Props = {
    stimuli: Frame[];
    border: Border | Border[];
};
export declare const arrangeInLine: (props: Props) => string;
export default arrangeInLine;
