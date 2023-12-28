import { html } from "../utils";
import ColoredGraphic from "./webComponent";

type Props = {
  /** Link to image */
  graphic: string;

  /** Color in which the image should be colored */
  color: string;

  /** Width of stimulus */
  width: number;

  /** Height of stimulus */
  height: number;

  /** Can listen to colors sent by other stimuli. The location here is the same as the source stimuli's window location. */
  listenLocation?: string;

  cielab?: boolean;

  cielabRotate?: number;
};

/**
 * Display a graphic (preferably SVG) that gets colored with the specified color
 * @returns string of html source code
 */
export const coloredGraphic = (props: Props): string => {
  new ColoredGraphic();

  console.log("this");

  return html`
    <colored-graphic
      graphic=${'"' + props.graphic + '"'}
      color=${props.color}
      width=${props.width}
      height=${props.height}
      listenLocation=${props.listenLocation
        ? '"' + props.listenLocation + '"'
        : '""'}
      cielab=${props.cielab ?? false}
      cielabRotate=${props.cielabRotate ?? 0}
    >
    </colored-graphic>
  `;
};

export default coloredGraphic;
