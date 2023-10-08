import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";


@customElement("color-picker")
export default class ColorPicker extends LitElement {
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

  @property({ type: String }) selectedColor = "#FFFFFF";

  @property({type: Array}) position = [0,0];

 
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
      // The color's saturation is expressed as a percentage (0 - 100)
      let s = 30;
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${h}, 100%, 60%)`;
      // To calculate the position of the color on the wheel we use the sine and cosine as explained on
      // https://en.wikipedia.org/wiki/Trigonometric_functions.
      // Low saturation colors are drawn close to the center of the wheel while high saturation colors are drawn further
      // away. The whole wheel is scaled to make the diameter bigger than 200 pixels (1 pixel per 1% saturation as the
      // radius).
      const posX = MIDDLE_X + Math.cos(degreeToRadian(h)) * s * SCALE;
      const posY = MIDDLE_Y - Math.sin(degreeToRadian(h)) * s * SCALE;
      // At that position we draw a little dot that gets bigger the further away from the center it lies (scales with s).
      // We draw a full circle from 0 to 360 degrees which is the same as 0 to 2π radians.
      ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI);
      ctx.lineWidth = this.thickness;
      ctx.lineCap = "square";
      ctx.stroke();
      ctx.closePath()
      if(!(this.position[0] == 0 && this.position[1] == 0)){
        ctx.beginPath();

      ctx.arc(this.position[0], this.position[1], 5, 0, 2 * Math.PI);
      ctx.fill()
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
      console.log(this.innerHTML);
      const x = event.offsetX;
      const y = event.offsetY;
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      if (!(pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0)) {
        window[this.resultLocation] = rgbToHex(pixel[0], pixel[1], pixel[2]);
        const event = new CustomEvent("color_picker__result", { detail:  rgbToHex(pixel[0], pixel[1], pixel[2])});
        window.dispatchEvent(event);
        this.selectedColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        this.position = [x, y];
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
        <div class="swatch-container">selected color: <div class="color-swatch" style="${"background-color: " + this.selectedColor}"></div></div>
      </div>
    `;
  }
}
