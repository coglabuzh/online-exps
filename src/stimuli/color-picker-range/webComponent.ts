import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { convertDegreeToRadian, convertRgbToHex } from "../utils";

@customElement("color-picker-range")
export default class ColorPickerRange extends LitElement {
  static styles = css`
    canvas {
      cursor: crosshair;
      z-index: 20;
    }
    .container {
      position: relative;
      display: flex; /* Use flexbox to center the child */
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
    }
    .inner-html {
      position: absolute;
      top: auto;
      bottom: auto;
      left: 0px;
      right: 0px;
    }
    .color-swatch {
      height: 30px;
      width: 30px;
    }
    .swatch-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  `;

  @property({ type: String }) selectedColorStart = "#FFFFFF";
  @property({ type: String }) selectedColorEnd = "#FFFFFF";

  @property({ type: Array }) positionStart = [0, 0];
  @property({ type: Array }) positionEnd = [0, 0];

  @property({ type: Boolean }) isStartSelected = false;
  @property({ type: Boolean }) isEndSelected = false;

  @property({ type: Number })
  radius: number;
  @property({ type: Number })
  thickness: number;

  startLocation = "color_picker_range__result_start";
  endLocation = "color_picker_range__result_end";


  firstUpdated() {
    this.drawColorWheel();
  }

  drawColorWheel() {
    const canvas: HTMLCanvasElement | null =
      this.shadowRoot?.querySelector("canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const WIDTH = 600;
    const HEIGHT = 600;

    const MIDDLE_X = WIDTH / 2;
    const MIDDLE_Y = HEIGHT / 2;



    

    if (!ctx) throw new Error("Context not found, please call setContext().");

    // A circle has 360 degrees, corresponding to all possible hue values (0 - 360)
    for (let h = 0; h <= 360; h++) {
      let s = this.radius
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${h}, 100%, 60%)`;
      const posX = MIDDLE_X + Math.cos(convertDegreeToRadian(h)) * s;
      const posY = MIDDLE_Y - Math.sin(convertDegreeToRadian(h)) * s;
      ctx.arc(posX, posY, this.thickness, 0, 2 * Math.PI);
      ctx.lineWidth = this.thickness;
      ctx.lineCap = "square";
      ctx.stroke();
      ctx.closePath();
      if (!(this.positionStart[0] == 0 && this.positionStart[1] == 0)) {
        ctx.beginPath();

        // show circle
        ctx.arc(
          this.positionStart[0],
          this.positionStart[1],
          5,
          0,
          2 * Math.PI
        );

        // show line
        const dx = this.positionStart[0] - MIDDLE_X;
        const dy = this.positionStart[1] - MIDDLE_Y;
        const theta = Math.atan2(dy, dx);

        ctx.moveTo(
          MIDDLE_X + Math.cos(theta) * (s - this.thickness),
          MIDDLE_Y + Math.sin(theta) * (s - this.thickness)
        );
        ctx.lineTo(
          MIDDLE_X + Math.cos(theta) * (s + this.thickness),
          MIDDLE_Y + Math.sin(theta) * (s + this.thickness)
        );

        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
      if (
        !(this.positionEnd[0] == 0 && this.positionEnd[1] == 0) &&
        this.isEndSelected
      ) {
        ctx.beginPath();

        // show circle
        ctx.arc(this.positionEnd[0], this.positionEnd[1], 5, 0, 2 * Math.PI);


        // show line
        const dx = this.positionEnd[0] - MIDDLE_X;
        const dy = this.positionEnd[1] - MIDDLE_Y;
        const theta = Math.atan2(dy, dx);

        ctx.moveTo(
          MIDDLE_X + Math.cos(theta) * (s - this.thickness),
          MIDDLE_Y + Math.sin(theta) * (s - this.thickness)
        );
        ctx.lineTo(
          MIDDLE_X + Math.cos(theta) * (s + this.thickness),
          MIDDLE_Y + Math.sin(theta) * (s + this.thickness)
        );

        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }

    

    canvas.addEventListener("click", (event) => {
      console.log("RANGE");
      const x = event.offsetX;
      const y = event.offsetY;
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      if (!(pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0)) {
        const color = convertRgbToHex(pixel[0], pixel[1], pixel[2]);
        if (!this.isStartSelected) {
          this.selectedColorStart = color;
          this.positionStart = [x, y];
          this.isStartSelected = true;
          this.isEndSelected = false;
        } else {
          this.selectedColorEnd = color;
          this.positionEnd = [x, y];
          this.isStartSelected = false;



          // write to window object
          window[this.startLocation] = this.selectedColorStart;
          window[this.endLocation] = this.selectedColorEnd;

          // send events when colors change
          const eventStart = new CustomEvent(this.startLocation, {
            detail: this.selectedColorStart,
          });
          const eventEnd = new CustomEvent(this.endLocation, {
            detail: this.selectedColorEnd,
          });
          window.dispatchEvent(eventStart);
          window.dispatchEvent(eventEnd);

       
          this.isEndSelected = true;
        }
        this.drawColorWheel();
        this.requestUpdate(); // Ask lit to re-render
      }
    });
  }

  render() {
    return html`
      <div>
        <div class="container">
          <canvas width="600" height="600"></canvas>
          <div class="inner-html"><slot></slot></div>
        </div>
        <div class="swatch-container">
          selected color range:
          <div
            class="color-swatch"
            style="${"background-color: " + this.selectedColorStart}"
          ></div>
          to
          <div
            class="color-swatch"
            style="${"background-color: " + this.selectedColorEnd}"
          ></div>
        </div>
      </div>
    `;
  }
}
