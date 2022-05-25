import { createGradient, getPositionFromColor } from "./canvas";
import { createColor, createColorFromHsl } from "./color";
import "./style.css";
import { Color } from "./types";

const colorPallette = <HTMLCanvasElement>document.getElementById("pallette");
const colorBar = <HTMLCanvasElement>document.getElementById("bar");
const palletteCtx = colorPallette.getContext("2d");
const barCtx = colorBar.getContext("2d");

const color = new Proxy(createColor(0, 0, 255), {
  get: function (obj: Color, prop: keyof Color) {
    return obj[prop];
  },
  set: function (obj: Color, prop: keyof Color, value: number) {
    obj[prop] = value;
    generatePallette();
    return true;
  },
  deleteProperty: function (obj: Color, prop: keyof Color) {
    delete obj[prop];
    return true;
  },
});

const generatePallette = () => {
  if (palletteCtx) {
    const { width, height } = palletteCtx.canvas;
    palletteCtx.clearRect(0, 0, width, height);
    const gradientH = createGradient(palletteCtx, width, 0, [
      createColor(255, 255, 255),
      color,
    ]);
    palletteCtx.fillStyle = gradientH;
    palletteCtx.fillRect(0, 0, width, height);

    const gradientV = createGradient(palletteCtx, 0, height, [
      createColor(0, 0, 0, 0),
      createColor(0, 0, 0),
    ]);
    palletteCtx.fillStyle = gradientV;
    palletteCtx.fillRect(0, 0, width, height);
  }
};

if (barCtx) {
  const { width, height } = barCtx.canvas;
  const gradientV = createGradient(
    barCtx,
    0,
    height,
    new Array(13).fill(null).map((_, i) => {
      return createColorFromHsl(`hsl(${i * 30}, 100%, 50%)`);
    })
  );
  barCtx.fillStyle = gradientV;
  barCtx.fillRect(0, 0, width, height);
}

// colorPallette.addEventListener("click", ($e: MouseEvent) => {
//   const x = $e.offsetX;
//   const y = $e.offsetY;
//   if (palletteCtx) {
//     const pixel = palletteCtx.getImageData(x, y, 1, 1)["data"]; // Read pixel Color
//     document.body.style.background = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

//     const [xq, yq] = getPositionFromColor(
//       palletteCtx,
//       createColor(pixel[0], pixel[1], pixel[2])
//     );
//     palletteCtx.beginPath();
//     palletteCtx.arc(xq, yq, 8, 0, 2 * Math.PI, false);
//     palletteCtx.lineWidth = 5;
//     palletteCtx.strokeStyle = "#000";
//     palletteCtx.stroke();
//   }
// });

// colorBar.addEventListener("click", ($e: MouseEvent) => {
//   const x = $e.offsetX;
//   const y = $e.offsetY;
//   if (barCtx) {
//     const pixel = barCtx.getImageData(x, y, 1, 1)["data"];
//     color.red = pixel[0];
//     color.green = pixel[1];
//     color.blue = pixel[2];
//   }
// });

generatePallette();
