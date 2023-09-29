import { html } from "../utils";
import ColorPicker from "./web-component"


type Props = {
  
  innerHTML?: string
  radius?: number;
  thickness?: number;
  resultLocation?: number;
};


export const colorPicker = (props: Props): string => {

  new ColorPicker();

  return html`<color-picker innerHTML=${props.innerHTML ?? "\"<div></div>\""} thickness=${props.thickness ?? 10} radius=${props.radius ?? 10 } resultLocation=${props.resultLocation ?? "color-picker__result"} ></color-picker>`
};

export default colorPicker;
