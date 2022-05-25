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

export const getPositionFromColor = (
  ctx: CanvasRenderingContext2D,
  color: Color
) => {
  const { width, height } = ctx.canvas;
  const buffer = ctx.getImageData(0, 0, width, height)["data"];
  let x,
    y,
    p,
    px = 0;

  /// iterating x/y instead of forward to get position the easy way
  for (y = 0; y < height; y++) {
    /// common value for all x
    p = y * 4 * width;

    for (x = 0; x < width; x++) {
      /// next pixel (skipping 4 bytes as each pixel is RGBA bytes)
      px = p + x * 4;

      /// if red component match check the others
      if (buffer[px] === color.red) {
        if (buffer[px + 1] === color.green && buffer[px + 2] === color.green) {
          return [x, y];
        }
      }
    }
  }
  console.log("sdss");
  return [0, 0];
};
