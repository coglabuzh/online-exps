import { html } from "../utils";

import ColorPickerRange from "./webComponent"


type Props = {
  /** Appears in the center of the color wheel; text or html */
  content?: string;
  /** Radius of color wheel */
  radius?: number;
  /** Thickness of color wheel */
  thickness?: number;
  /** Which attribute of the window object should the result (color as HTML color code) be written in? */
  resultLocation?: string;
};


export const colorPicker = (props: Props): string => {

  new ColorPickerRange();

  return html`<color-picker-range
    thickness=${props.thickness ?? 10}
    radius=${props.radius ?? 10}
    resultLocation=${props.resultLocation
      ? '"' + props.resultLocation + '"'
      : "color_picker__result"}
  >
    ${props.content ?? "<div></div>"}
  </color-picker>`;
};

export default colorPicker;
