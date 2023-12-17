import { Frame, Border } from "./arrangeTypes";

import { html } from "../utils";

type Props = {
  stimuli: Frame[];
  centre: [number, number];
  radius: number;
  border: Border | Border[];
  start_position?: number;
};

/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */

export const arrangeInCircle = (props: Props): string => {
  const { stimuli, centre, radius, border, start_position } = props;

  const borderArray = Array.isArray(border)
    ? border
    : Array(stimuli.length).fill(border);

  const n = stimuli.length;

  const theta = (2 / n) * Math.PI;

  let markup = html`<div
    style="position: relative; width: 100%; height: 100%"
  ></div>`;
  const defaultLocation = "circle_of_squares__result";

  const width = stimuli.map((stimulus) => {
    if (stimulus.type == "image") {
      return stimulus.width ?? 100;
    } else if (stimulus.type == "text") {
      return 200;
    } else if (stimulus.type == "rectangle") {
      return stimulus.width ?? 100;
    } else if (stimulus.type == "circle") {
      return stimulus.radius ?? 100;
    }
  });

  const height = stimuli.map((stimulus) => {
    if (stimulus.type == "image") {
      return 200;
    } else if (stimulus.type == "text") {
      return 200;
    } else if (stimulus.type == "rectangle") {
      return stimulus.height ?? 100;
    } else if (stimulus.type == "circle") {
      return stimulus.radius ?? 100;
    }
  });

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
      const offsetX =
        Math.sin(theta * (-2 - ((i + start_position) % stimuli.length))) *
          radius -
        width / 2;
      const offsetY =
        Math.cos(theta * (-2 - ((i + start_position) % stimuli.length))) *
          radius -
        height / 2;
      return html`
        <div
          ${stimulus.clickable && "onclick=" + response_function}
          style="width: ${width}px;
        height: ${height}px;
        background-color: ${stimulus.background ?? "transparent"};
        ${baseCSS}
        transform: translate(${offsetX}px, ${offsetY}px) ${stimulus.angle
            ? `rotate(${stimulus.angle}deg)`
            : ""};"
          aspect-ratio="${stimulus.ratio ?? 1}"
        >
          <img src="${stimulus.imagePath}" style="width: 100%; height: 100%;" />
        </div>
      `;
    }
    if (stimulus.type == "text") {
      const width = 200;
      const height = 200;
      const offsetX =
        Math.sin(theta * (-2 - ((i + start_position) % stimuli.length))) *
          radius -
        (width ?? 100) / 2;
      const offsetY =
        Math.cos(theta * (-2 - ((i + start_position) % stimuli.length))) *
          radius -
        (height ?? 100) / 2;
      return html`
        <div
          ${stimulus.clickable && "onclick=" + response_function}
          style="width: ${width}px;
            height: ${height}px;
            color: ${stimulus.color ?? "black"};
      ${baseCSS}
            transform: translate(${offsetX}px, ${offsetY}px) ${stimulus.angle
            ? `rotate(${stimulus.angle}deg)`
            : ""};"
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
      const offsetX =
        Math.sin(theta * (-2 - ((i + start_position) % stimuli.length))) *
          radius -
        (width ?? 100) / 2;
      const offsetY =
        Math.cos(theta * (-2 - ((i + start_position) % stimuli.length))) *
          radius -
        (height ?? 100) / 2;
      return html`
        <div
          ${stimulus.clickable && "onclick=" + response_function}
          style="width: ${width}px;
            height: ${height}px;
            background-color: ${stimulus.fillColor ?? "transparent"};
            border: ${stimulus.lineType ?? "solid"} ${stimulus.lineWidth ??
          1}px ${stimulus.lineColor ?? "black"};

            transform: translate(${offsetX}px, ${offsetY}px) ${stimulus.angle
            ? `rotate(${stimulus.angle}deg)`
            : ""};
            ${baseCSS}
            
            "
        ></div>
      `;
    }
    if (stimulus.type == "circle") {
      const radius = stimulus.radius ?? 100;
      const offsetX =
        Math.sin(theta * (-2 - ((i + start_position) % stimuli.length))) *
          radius -
        radius;
      const offsetY =
        Math.cos(theta * (-2 - ((i + start_position) % stimuli.length))) *
          radius -
        radius;

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
             
            transform: translate(${offsetX}px, ${offsetY}px) ${stimulus.angle
            ? `rotate(${stimulus.angle}deg)`
            : ""};"
        ></div>
      `;
    }
  };

  for (let i = 0; i < n; i++) {
    // Calculate the (x, y) coordinates of the current screen element.

    const baseCSS = `position: absolute;
			top: 50%; 
			left: 50%; 
			border: ${borderArray[i].lineType ?? "solid"} ${
      borderArray[i].lineWidth ?? 1
    }px ${borderArray[i].lineColor ?? "black"};
			display: flex; 
			justify-content: center; 
			align-items: center; 
			
      cursor: pointer;
			`;

    markup += getHTML(stimuli[i], borderArray[i], i, baseCSS);
  }
  markup += html`</div>`;
  return markup;
};

export default arrangeInCircle;
