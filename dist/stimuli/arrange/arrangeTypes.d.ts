export type Frame = ImageFrame | TextFrame | RectangleFrame | CircleFrame;
export type baseProperties = {
    clickable?: boolean;
};
export type ImageFrame = baseProperties & {
    type: "image";
    imagePath: string;
    background?: string;
    width?: number;
    ratio?: number;
    angle?: number;
};
export type TextFrame = baseProperties & {
    type: "text";
    content: string;
    color?: string;
    size?: number;
    family?: string;
    angle?: number;
};
export type RectangleFrame = baseProperties & {
    type: "rectangle";
    width?: number;
    height?: number;
    fillColor?: string;
    angle?: number;
    lineType?: string;
    lineWidth?: number;
    lineColor?: string;
};
export type CircleFrame = baseProperties & {
    type: "circle";
    radius?: number;
    fillColor?: string;
    angle?: number;
    lineType?: string;
    lineWidth?: number;
    lineColor?: string;
};
export type Border = baseProperties & {
    width?: number;
    height?: number;
    background?: string;
    angle?: number;
    lineType?: string;
    lineWidth?: number;
    lineColor?: string;
};
