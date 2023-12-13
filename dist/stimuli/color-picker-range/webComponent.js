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
let ColorPickerRange = class ColorPickerRange extends lit_1.LitElement {
    constructor() {
        super(...arguments);
        this.selectedColorStart = "#FFFFFF";
        this.selectedColorEnd = "#FFFFFF";
        this.positionStart = [0, 0];
        this.positionEnd = [0, 0];
        this.isStartSelected = false;
        this.isEndSelected = false;
        this.startLocation = "color_picker_range__result_start";
        this.endLocation = "color_picker_range__result_end";
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
            let s = this.radius;
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${h}, 100%, 60%)`;
            const posX = MIDDLE_X + Math.cos((0, utils_1.convertDegreeToRadian)(h)) * s;
            const posY = MIDDLE_Y - Math.sin((0, utils_1.convertDegreeToRadian)(h)) * s;
            ctx.arc(posX, posY, this.thickness, 0, 2 * Math.PI);
            ctx.lineWidth = this.thickness;
            ctx.lineCap = "square";
            ctx.stroke();
            ctx.closePath();
            if (!(this.positionStart[0] == 0 && this.positionStart[1] == 0)) {
                ctx.beginPath();
                // show circle
                ctx.arc(this.positionStart[0], this.positionStart[1], 5, 0, 2 * Math.PI);
                // show line
                const dx = this.positionStart[0] - MIDDLE_X;
                const dy = this.positionStart[1] - MIDDLE_Y;
                const theta = Math.atan2(dy, dx);
                ctx.moveTo(MIDDLE_X + Math.cos(theta) * (s - this.thickness), MIDDLE_Y + Math.sin(theta) * (s - this.thickness));
                ctx.lineTo(MIDDLE_X + Math.cos(theta) * (s + this.thickness), MIDDLE_Y + Math.sin(theta) * (s + this.thickness));
                ctx.strokeStyle = "black";
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
            if (!(this.positionEnd[0] == 0 && this.positionEnd[1] == 0) &&
                this.isEndSelected) {
                ctx.beginPath();
                // show circle
                ctx.arc(this.positionEnd[0], this.positionEnd[1], 5, 0, 2 * Math.PI);
                // show line
                const dx = this.positionEnd[0] - MIDDLE_X;
                const dy = this.positionEnd[1] - MIDDLE_Y;
                const theta = Math.atan2(dy, dx);
                ctx.moveTo(MIDDLE_X + Math.cos(theta) * (s - this.thickness), MIDDLE_Y + Math.sin(theta) * (s - this.thickness));
                ctx.lineTo(MIDDLE_X + Math.cos(theta) * (s + this.thickness), MIDDLE_Y + Math.sin(theta) * (s + this.thickness));
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
                const color = (0, utils_1.convertRgbToHex)(pixel[0], pixel[1], pixel[2]);
                if (!this.isStartSelected) {
                    this.selectedColorStart = color;
                    this.positionStart = [x, y];
                    this.isStartSelected = true;
                    this.isEndSelected = false;
                }
                else {
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
        return (0, lit_1.html) `
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
};
ColorPickerRange.styles = (0, lit_1.css) `
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
__decorate([
    (0, decorators_js_1.property)({ type: String })
], ColorPickerRange.prototype, "selectedColorStart", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: String })
], ColorPickerRange.prototype, "selectedColorEnd", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Array })
], ColorPickerRange.prototype, "positionStart", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Array })
], ColorPickerRange.prototype, "positionEnd", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Boolean })
], ColorPickerRange.prototype, "isStartSelected", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Boolean })
], ColorPickerRange.prototype, "isEndSelected", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Number })
], ColorPickerRange.prototype, "radius", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Number })
], ColorPickerRange.prototype, "thickness", void 0);
ColorPickerRange = __decorate([
    (0, decorators_js_1.customElement)("color-picker-range")
], ColorPickerRange);
exports.default = ColorPickerRange;
