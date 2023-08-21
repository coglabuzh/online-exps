import { LitElement } from 'lit';
interface Frame {
    word: string;
    frame_color?: string;
    text_color?: string;
    bg_color?: string;
}
export declare class CircleOfSquares extends LitElement {
    frames: Frame[];
    onFrameClick?: (index: number) => void;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
