import { LitElement } from "lit";
export default class ColorPickerRange extends LitElement {
    static styles: import("lit").CSSResult;
    selectedColorStart: string;
    selectedColorEnd: string;
    positionStart: number[];
    positionEnd: number[];
    isStartSelected: boolean;
    isEndSelected: boolean;
    radius: number;
    thickness: number;
    startLocation: string;
    endLocation: string;
    firstUpdated(): void;
    drawColorWheel(): void;
    render(): import("lit-html").TemplateResult<1>;
}
