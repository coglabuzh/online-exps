import { Frame, Border } from "./arrangeTypes";
type Props = {
    stimuli: Frame[];
    numColumns: number;
    border: Border | Border[];
};
export declare const arrangeInMatrix: (props: Props) => string;
export default arrangeInMatrix;
