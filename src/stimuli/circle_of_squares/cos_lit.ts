import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Frame {
	word: string;
	frame_color?: string;
	text_color?: string;
	bg_color?: string;
}

interface SquareProps {
	frames: Frame[];
	onFrameClick?: (index: number) => void;
}

@customElement('circle-of-squares')
export class CircleOfSquares extends LitElement {

	@property() frames: Frame[] = [];
	@property({ type: Function }) onFrameClick?: (index: number) => void;

	static styles = css`
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

	render() {
		const n = this.frames.length;
		return html`
      <div class="circle">
        ${this.frames.map((frame, i) => {
			const degree = 360 * (i / n);
			return html`
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
}
