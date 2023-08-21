"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleOfSquares = void 0;
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
let CircleOfSquares = exports.CircleOfSquares = (() => {
    let _classDecorators = [(0, decorators_js_1.customElement)('circle-of-squares')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _frames_decorators;
    let _frames_initializers = [];
    let _onFrameClick_decorators;
    let _onFrameClick_initializers = [];
    var CircleOfSquares = _classThis = class extends lit_1.LitElement {
        constructor() {
            super(...arguments);
            this.frames = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _frames_initializers, []));
            this.onFrameClick = __runInitializers(this, _onFrameClick_initializers, void 0);
        }
        render() {
            const n = this.frames.length;
            return (0, lit_1.html) `
      <div class="circle">
        ${this.frames.map((frame, i) => {
                const degree = 360 * (i / n);
                return (0, lit_1.html) `
            <div 
              class="square" 
              style="border: 4px solid ${frame.frame_color || 'black'}; color: ${frame.text_color || 'black'}; background-color: ${frame.bg_color || 'white'}; transform: translate(-50%, -50%) rotate(${degree}deg) translate(200px) rotate(-${degree}deg);"
              @click="${() => this.onFrameClick && this.onFrameClick(i)}"
            >
              ${frame.word}
            </div>
          `;
            })}
      </div>
    `;
        }
    };
    __setFunctionName(_classThis, "CircleOfSquares");
    (() => {
        _frames_decorators = [(0, decorators_js_1.property)()];
        _onFrameClick_decorators = [(0, decorators_js_1.property)({ type: Function })];
        __esDecorate(null, null, _frames_decorators, { kind: "field", name: "frames", static: false, private: false, access: { has: obj => "frames" in obj, get: obj => obj.frames, set: (obj, value) => { obj.frames = value; } } }, _frames_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _onFrameClick_decorators, { kind: "field", name: "onFrameClick", static: false, private: false, access: { has: obj => "onFrameClick" in obj, get: obj => obj.onFrameClick, set: (obj, value) => { obj.onFrameClick = value; } } }, _onFrameClick_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        CircleOfSquares = _classThis = _classDescriptor.value;
    })();
    _classThis.styles = (0, lit_1.css) `
    .circle {
      position: relative;
      width: 400px;
      height: 400px;
    }

    .square {
      position: absolute;
      top: 50%; 
      left: 50%; 
      width: 100px; 
      height: 100px; 
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CircleOfSquares = _classThis;
})();
