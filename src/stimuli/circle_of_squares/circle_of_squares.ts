
type Frame = {
	word: string,
	frame_color?: string,
	bg_color?: string,
	text_color?: string
}

type Props = {
	frames: Frame[],
	frame_color?: string,
	bg_color?: string,
	text_color?: string
}


export const circleOfSquares = (props: Props): string => {

	const { frames } = props

	const n = frames.length

	const theta = (2 / n) * Math.PI;
	const radius = 200;

	let html = `<div style="position: relative; width: 400px; height: 400px;">`;
	for (let i = 0; i < n; i++) {
		// Calculate the (x, y) coordinates of the current screen element.
		const offsetX = Math.sin(theta * (-2 - i)) * radius; // 200 is the radius
		const offsetY = Math.cos(theta * (-2 - i)) * radius;
		html += /*html*/ `
			<div style="
			position: absolute;
			border-radius: 200px;
			top: 50%; 
			left: 50%; 
			width: 100px; 
			height: 100px; 
			border: 4px solid ${frames[i].frame_color ? frames[i].frame_color : " black"}; 
			color: ${frames[i].text_color ? frames[i].text_color : "black" }; 
			background-color: ${frames[i].bg_color ? frames[i].bg_color : "white" }; 
			display: flex; 
			justify-content: center; 
			align-items: center; 
			transform: translate(${offsetX}px, ${offsetY}px); 
			">
				${frames[i].word}
			</div>
    `;
	}
	html += `</div>`;
	return html;


}