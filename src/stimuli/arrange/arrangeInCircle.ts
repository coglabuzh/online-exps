import { Frame, Border } from "./arrangeTypes";
import { getHtml } from "./getHtml";
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

  const n = stimuli.length;

  const theta = (2 / n) * Math.PI;

  const getPosition = (stimulus: Frame, i: number): [number, number] => {
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
      return [offsetX, offsetY];
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
      return [offsetX, offsetY];
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
      return [offsetX, offsetY];
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

      return [offsetX, offsetY];
    }
  };

  const positions = [];

  for (let i = 0; i < n; i++) {
    // Calculate the (x, y) coordinates of the current screen element.

    positions.push(getPosition(stimuli[i], i));
  }

  return getHtml({ positions: positions, stimuli: stimuli, border: border });
};

export default arrangeInCircle;
