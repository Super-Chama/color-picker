import { Color } from "./types";

export const createColor = (red = 0, green = 0, blue = 0, alpha = 1): Color => {
  return {
    red,
    green,
    blue,
    alpha,
  };
};

export const createColorFromHex = (hex = "#fff"): Color => {
  const _hex = hex.trim().slice(0, 1);
  const red = parseInt(_hex.substring(0, 2), 16);
  const green = parseInt(_hex.substring(2, 2), 16);
  const blue = parseInt(_hex.substring(4, 2), 16);
  const alpha = parseInt(_hex.substring(6, 2), 16) ?? 1;
  return createColor(red, green, blue, alpha);
};

// simplified verison from https://css-tricks.com/converting-color-spaces-in-javascript/
export const createColorFromHsl = (hsl = "hsl(0, 0%, 100%)"): Color => {
  const _hsl = hsl.substring(4).split(")")[0].split(",");

  let h = parseInt(_hsl[0]);
  const s = parseInt(_hsl[1].substring(0, _hsl[1].length - 1)) / 100;
  const l = parseInt(_hsl[2].substring(0, _hsl[2].length - 1)) / 100;

  if (h >= 360) h %= 360;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return createColor(r, g, b);
};

export const color2Hex = (color: Color): string => {
  return (
    "#" +
    color.red.toString(16) +
    color.green.toString(16) +
    color.blue.toString(16)
  );
};

export const color2RGB = (color: Color): string => {
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;
};

export const color2RGBA = (color: Color): string => {
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
};
