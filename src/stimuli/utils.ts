// ensures that html strings get syntax highlighting and formatting with prettier
export const html = String.raw



export function convertRgbToHex(r: number, g: number, b: number): string {
      const red = r.toString(16).padStart(2, "0");
      const green = g.toString(16).padStart(2, "0");
      const blue = b.toString(16).padStart(2, "0");

      return `#${red}${green}${blue}`;
    }


export function convertDegreeToRadian(deg) {
  return (deg * Math.PI) / 180;
}