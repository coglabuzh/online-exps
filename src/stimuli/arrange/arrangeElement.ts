import { Frame, Border } from "./arrangeTypes";
import { getHtml } from "./getHtml";
import { html } from "../utils";

type Props = {
  stimulus: Frame;
  position: [number, number];
  border: Border;
};

/**
 * Display stimuli laid out in a circle.
 * @returns string of html source code
 */

export const arrangeElement = (props: Props): string => {
  const { stimulus, position, border } = props;

  const genHtml = getHtml({
    stimuli: [stimulus],
    border: border,
    positions: [position],
  });

  return genHtml;
};

export default arrangeElement;
