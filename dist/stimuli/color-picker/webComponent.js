"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const utils_1 = require("../utils");
let ColorPicker = class ColorPicker extends lit_1.LitElement {
    constructor() {
        super(...arguments);
        this.selectedColor = "#FFFFFF";
        this.position = [0, 0];
        this.resultLocation = "color_picker__result";
    }
    firstUpdated() {
        this.drawColorWheel();
    }
    drawColorWheel() {
        var _a;
        const canvas = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("canvas");
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        const WIDTH = 600;
        const HEIGHT = 600;
        const MIDDLE_X = WIDTH / 2;
        const MIDDLE_Y = HEIGHT / 2;
        if (!ctx)
            throw new Error("Context not found, please call setContext().");
        // A circle has 360 degrees, corresponding to all possible hue values (0 - 360)
        for (let h = 0; h <= 360; h++) {
            // The color's saturation is expressed as a percentage (0 - 100)
            let s = this.radius;
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${h}, 100%, 60%)`;
            // To calculate the position of the color on the wheel we use the sine and cosine as explained on
            // https://en.wikipedia.org/wiki/Trigonometric_functions.
            // Low saturation colors are drawn close to the center of the wheel while high saturation colors are drawn further
            // away. The whole wheel is scaled to make the diameter bigger than 200 pixels (1 pixel per 1% saturation as the
            // radius).
            const posX = MIDDLE_X + Math.cos((0, utils_1.convertDegreeToRadian)(h)) * s;
            const posY = MIDDLE_Y - Math.sin((0, utils_1.convertDegreeToRadian)(h)) * s;
            // At that position we draw a little dot that gets bigger the further away from the center it lies (scales with s).
            // We draw a full circle from 0 to 360 degrees which is the same as 0 to 2π radians.
            ctx.arc(posX, posY, this.thickness, 0, 2 * Math.PI);
            ctx.lineWidth = this.thickness;
            ctx.lineCap = "square";
            ctx.stroke();
            ctx.closePath();
            if (!(this.position[0] == 0 && this.position[1] == 0)) {
                ctx.beginPath();
                ctx.arc(this.position[0], this.position[1], 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }
        }
        canvas.addEventListener("click", (event) => {
            console.log(this.innerHTML);
            const x = event.offsetX;
            const y = event.offsetY;
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            if (!(pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0)) {
                window[this.resultLocation] = (0, utils_1.convertRgbToHex)(pixel[0], pixel[1], pixel[2]);
                const event = new CustomEvent(this.resultLocation, { detail: (0, utils_1.convertRgbToHex)(pixel[0], pixel[1], pixel[2]) });
                window.dispatchEvent(event);
                this.selectedColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                this.position = [x, y];
                this.drawColorWheel();
                this.requestUpdate(); // Ask lit to re-render
            }
        });
    }
    render() {
        return (0, lit_1.html) `
      <div><div class="container">
        <canvas width="600" height="600"></canvas>
        <div class="inner-html"><slot></slot></div>
        </div>
        <div class="swatch-container">selected color: <div class="color-swatch" style="${"background-color: " + this.selectedColor}"></div></div>
      </div>
    `;
    }
};
ColorPicker.styles = (0, lit_1.css) `
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
__decorate([
    (0, decorators_js_1.property)({ type: String })
], ColorPicker.prototype, "selectedColor", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Array })
], ColorPicker.prototype, "position", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Number })
], ColorPicker.prototype, "radius", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Number })
], ColorPicker.prototype, "thickness", void 0);
ColorPicker = __decorate([
    (0, decorators_js_1.customElement)("color-picker")
], ColorPicker);
exports.default = ColorPicker;
