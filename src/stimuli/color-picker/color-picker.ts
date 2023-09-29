import { html } from "../utils";
import ColorPicker from "./web-component"


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

  new ColorPicker();

  return html`<color-picker innerHTML=${"\"" + props.content + "\"" ?? "\"<div></div>\""} thickness=${props.thickness ?? 10} radius=${props.radius ?? 10 } resultLocation=${props.resultLocation ?? "color-picker__result"} ></color-picker>`
};

export default colorPicker;
