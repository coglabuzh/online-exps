import { Frame, Border } from "./arrangeTypes";
import { getHtml } from "./getHtml";
import { html } from "../utils";

type Props = {
  stimuli: Frame[];
  numColumns: number;
  border: Border | Border[];
};

/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */
const defaultLocation = "arrange_in_matrix__result";
const getHTML = (
  stimulus: Frame,
  border: Border,
  i: number,
  baseCSS: string
) => {
  const response_function = `"window['${defaultLocation}'] = ${i}"`;
  if (stimulus.type == "image") {
    const width = stimulus.width ?? 300;
    const height = 200;

    return html`
      <div
        ${stimulus.clickable && "onclick=" + response_function}
        style="width: ${width}px;
        height: ${height}px;
        background-color: ${stimulus.background ?? "transparent"};
        ${baseCSS}
        transform: ${stimulus.angle ? `rotate(${stimulus.angle}deg)` : ""};"
        aspect-ratio="${stimulus.ratio ?? 1}"
      >
        <img src="${stimulus.imagePath}" style="width: 100%; height: 100%;" />
      </div>
    `;
  }
  if (stimulus.type == "text") {
    const width = 200;
    const height = 200;
    return html`
      <div
        ${stimulus.clickable && "onclick=" + response_function}
        style="width: ${width}px;
            height: ${height}px;
            color: ${stimulus.color ?? "black"};
      ${baseCSS}
            transform: ${stimulus.angle ? `rotate(${stimulus.angle}deg)` : ""};"
      >
        <div
          style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; font-size: ${stimulus.size ??
          50}px; color: ${stimulus.color ??
          "black"}; font-family: ${stimulus.family ?? "Arial"};   "
        >
          ${stimulus.content}
        </div>
      </div>
    `;
  }
  if (stimulus.type == "rectangle") {
    const width = stimulus.width ?? 100;
    const height = stimulus.height ?? 100;

    return html`
      <div
        ${stimulus.clickable && "onclick=" + response_function}
        style="width: ${width}px;
            height: ${height}px;
            background-color: ${stimulus.fillColor ?? "transparent"};
            border: ${stimulus.lineType ?? "solid"} ${stimulus.lineWidth ??
        1}px ${stimulus.lineColor ?? "black"};

            transform: ${stimulus.angle ? `rotate(${stimulus.angle}deg)` : ""};
            ${baseCSS}
            
            "
      ></div>
    `;
  }
  if (stimulus.type == "circle") {
    const radius = stimulus.radius ?? 100;

    return html`
      <div
        ${stimulus.clickable && "onclick=" + response_function}
        style=" ${baseCSS};
          width: ${radius}px;
            height: ${radius}px;
            background-color: ${stimulus.fillColor ?? "transparent"};
            border: ${stimulus.lineType ?? "solid"} ${stimulus.lineWidth ??
        1}px ${stimulus.lineColor ?? "black"};
            border-radius: 50%;
             
            transform: ${stimulus.angle ? `rotate(${stimulus.angle}deg)` : ""};"
      ></div>
    `;
  }
};

export const arrangeInMatrix = (props: Props): string => {
  const { stimuli, border, numColumns } = props;

  const n = stimuli.length;

  const borderArray = Array.isArray(border)
    ? border
    : Array(stimuli.length).fill(border);

  let genHtml = `<div style="display: grid; grid-template-columns: repeat(${numColumns}, minmax(0, 1fr)); gap: 100px; height: 100vh">`;

  for (let i = 0; i < n; i++) {
    const baseCSS = `border: ${borderArray[i].lineType ?? "solid"} ${
      borderArray[i].lineWidth ?? 1
    }px ${borderArray[i].lineColor ?? "black"};
			display: flex; 
			justify-content: center; 
			align-items: center; 
			
      cursor: pointer;`;

    genHtml += getHTML(stimuli[i], borderArray[i], i, baseCSS);
  }

  genHtml += html`</div>`;

  return genHtml;
};

export default arrangeInMatrix;
