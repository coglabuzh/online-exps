import { LitElement } from "lit";
export default class ColoredGraphic extends LitElement {
    graphic: string;
    color: string;
    width: number;
    height: number;
    listenLocation: string;
    styles: string;
    setColor(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
