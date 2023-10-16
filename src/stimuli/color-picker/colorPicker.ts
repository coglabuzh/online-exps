import { html } from "../utils";
import ColorPicker from "./webComponent"


type Props = {
  /** Appears in the center of the color wheel; text or html */
  content?: string;
  /** Radius of color wheel */
  radius?: number;
  /** Thickness of color wheel */
  thickness?: number;
};

/**
 * Displays a color wheel where the user can select a certain color.
 * Start of range is stored in window.color_picker__result
 * @returns string of html source code
 */
export const colorPicker = (props: Props): string => {

  new ColorPicker();

  return html`<color-picker
    thickness=${props.thickness ?? 10}
    radius=${props.radius ?? 10}

  >
    ${props.content ?? "<div></div>"}
  </color-picker>`;
};

export default colorPicker;
