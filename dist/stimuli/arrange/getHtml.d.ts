import { Frame, Border } from "./arrangeTypes";
type Props = {
    stimuli: Frame[];
    border: Border | Border[];
    positions: [number, number][];
};
export declare const getHtml: (props: Props) => string;
export {};
