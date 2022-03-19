import { Color } from "./types";
import { color2RGBA } from "./color";

export const createGradient = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: Color[]
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(0, 0, width, height);

  for (let i = 0; i < colors.length; i++) {
    let stop = (1 / (colors.length - 1)) * i;
    if (i === 0) {
      stop = 0;
    } else if (i === colors.length - 1) {
      stop = 1;
    }
    gradient.addColorStop(stop, color2RGBA(colors[i]));
  }
  return gradient;
};
