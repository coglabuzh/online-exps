import { LitElement } from "lit";
export default class ColorPicker extends LitElement {
    static styles: import("lit").CSSResult;
    selectedColor: string;
    position: number[];
    radius: number;
    thickness: number;
    resultLocation: string;
    firstUpdated(): void;
    drawColorWheel(): void;
    render(): import("lit-html").TemplateResult<1>;
}
