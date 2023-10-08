import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("color-picker-range")
export default class ColorPickerRange extends LitElement {
  static styles = css`
    canvas {
      cursor: crosshair;
      z-index:  20
    }
    .container{
      position: relative;
       display: flex; /* Use flexbox to center the child */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */

    }
    .inner-html{
      position: absolute;
      top: auto;
      bottom: auto;
      left: 0px;
      right: 0px
    }
    .color-swatch{
      height: 30px;
      width: 30px;
    }
    .swatch-container{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  `;

  @property({ type: String }) selectedColorStart = "#FFFFFF";
  @property({ type: String }) selectedColorEnd = "#FFFFFF";

  @property({type: Array}) positionStart = [0,0];
  @property({type: Array}) positionEnd = [0,0];

  @property({ type: Boolean }) isStartSelected = false;
  @property({ type: Boolean }) isEndSelected = false;

  @property({ type: Number })
  radius: number;
  @property({ type: Number })
  thickness: number;
  @property({ type: String })
  resultLocation: string;

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
    const SCALE = 6;
    const MIDDLE_X = WIDTH / 2;
    const MIDDLE_Y = HEIGHT / 2;

    const LIGHTNESS = 0.9;

    function degreeToRadian(deg) {
      return (deg * Math.PI) / 180;
    }

    if (!ctx) throw new Error("Context not found, please call setContext().");

    // A circle has 360 degrees, corresponding to all possible hue values (0 - 360)
    for (let h = 0; h <= 360; h++) {
      let s = 30;
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${h}, 100%, 60%)`;
      const posX = MIDDLE_X + Math.cos(degreeToRadian(h)) * s * SCALE;
      const posY = MIDDLE_Y - Math.sin(degreeToRadian(h)) * s * SCALE;
      ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI);
      ctx.lineWidth = this.thickness;
      ctx.lineCap = "square";
      ctx.stroke();
      ctx.closePath()
      if(!(this.positionStart[0] == 0 && this.positionStart[1] == 0)){
        ctx.beginPath();
        ctx.arc(this.positionStart[0], this.positionStart[1], 10, 0, 2 * Math.PI);
        ctx.strokeStyle = 'black';
        ctx.fill()
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
      if(!(this.positionEnd[0] == 0 && this.positionEnd[1] == 0) && this.isEndSelected){
        ctx.beginPath();
        ctx.arc(this.positionEnd[0], this.positionEnd[1], 10, 0, 2 * Math.PI);
        ctx.strokeStyle = 'black';
        ctx.fill()
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }

    function rgbToHex(r: number, g: number, b: number): string {
      const red = r.toString(16).padStart(2, "0");
      const green = g.toString(16).padStart(2, "0");
      const blue = b.toString(16).padStart(2, "0");

      return `#${red}${green}${blue}`;
    }

    canvas.addEventListener("click", (event) => {
      console.log("RANGE")
      const x = event.offsetX;
      const y = event.offsetY;
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      if (!(pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0)) {
        const color = rgbToHex(pixel[0], pixel[1], pixel[2]);
        if (!this.isStartSelected) {
          this.selectedColorStart = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
          this.positionStart = [x, y];
          this.isStartSelected = true;
          this.isEndSelected = false;
        } else {
          this.selectedColorEnd = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
          this.positionEnd = [x, y];
          this.isStartSelected = false;
          window[this.resultLocation] = [this.selectedColorStart, this.selectedColorEnd];
          const eventStart = new CustomEvent("color_picker__result_start", { detail:  this.selectedColorStart});
          const eventEnd = new CustomEvent("color_picker__result_end", { detail:  this.selectedColorEnd});
          window.dispatchEvent(eventStart);
          window.dispatchEvent(eventEnd);
          console.log("COLOR START:")
          console.log(this.selectedColorStart)
          console.log("COLOR END:")
          console.log(this.selectedColorEnd)
          this.isEndSelected = true;
        }
        this.drawColorWheel();
        this.requestUpdate(); // Ask lit to re-render
      }
    });
  }

  render() {
    return html`
      <div><div class="container">
        <canvas width="600" height="600"></canvas>
        <div class="inner-html"><slot></slot></div>
        </div>
        <div class="swatch-container">selected color range: <div class="color-swatch" style="${"background-color: " + this.selectedColorStart}"></div> to <div class="color-swatch" style="${"background-color: " + this.selectedColorEnd}"></div></div>
      </div>
    `;
  }
}
