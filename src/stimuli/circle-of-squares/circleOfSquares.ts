import { html } from "../utils";

/**
 * Array with one object per frame. Properties set here overwrite the general properties with the same name.
 */
type Frame = {
  /** Appears in each frame; text or html */
  content: string;

  /** Border color of the frame */
  border_color?: string;

  /** Background color of the frame */
  bg_color?: string;

  /** Text color inside the frame */
  text_color?: string;

  /** Width of the frame in px */
  width?: number;

  /** Height of the frame in px */
  height?: number;

  /** Custom CSS for the frame (file issue if frequently needed) */
  custom_css?: string;
};

/**
 * Properties set here apply for all Frames, can be overwritten by properties in the frames array.
 */
type Props = {
  /** Array of frames */
  frames: Frame[];

  /** Border color of the props */
  border_color?: string;

  /** Background color of the props */
  bg_color?: string;

  /** Text color inside the props */
  text_color?: string;

  /** Width of the frame in px */
  width?: number;

  /** Height of the frame in px */
  height?: number;

  /** Custom CSS for the props (file issue if frequently needed) */
  custom_css?: string;

  /** Radius of the circle */
  radius?: number;
};

/**
 * Display squares laid out in a circle.
 * @returns string of html source code
 */
export const circleOfSquares = (props: Props): string => {
  const { frames } = props;

  const n = frames.length;

  const theta = (2 / n) * Math.PI;
  const radius = props.radius ?? 200;

  let markup = html`<div
    style="position: relative; width: 100%; height: 100%"
  ></div>`;
  const defaultLocation = 'circle_of_squares__result'

  for (let i = 0; i < n; i++) {
    const response_function = `window['${defaultLocation}'] = ${i}`
    // Calculate the (x, y) coordinates of the current screen element.
    const offsetX = (Math.sin(theta * (-2 - i)) * radius) -  (frames[i].width ?? props.width ?? 100)/2;
    const offsetY =
      Math.cos(theta * (-2 - i)) * radius -
      (frames[i].height ?? props.height ?? 100)/2;
    markup += html`
      <div
        style="
			position: absolute;
			top: 50%; 
			left: 50%; 
			width: ${frames[i].width ?? props.width ?? 100}px; 
			height: ${frames[i].height ?? props.height ?? 100}px; 
			border: 4px solid ${frames[i].border_color ?? props.border_color ?? "black"}; 
			color: ${frames[i].text_color ?? "black"}; 
			background-color: ${frames[i].bg_color ?? props.bg_color ?? "white"}; 
			display: flex; 
			justify-content: center; 
			align-items: center; 
			transform: translate(${offsetX}px, ${offsetY}px);
      cursor: pointer;
			${props.custom_css ?? ""};
			${frames[i].custom_css ?? ""}
			"
        onclick="${response_function}"
      >
        ${frames[i].content}
      </div>
    `;
  }
  markup += html`</div>`;
  return markup;
};

export default circleOfSquares;
