const colorBar2 = <HTMLCanvasElement>document.getElementById("bar2");
const barCtx2 = colorBar2.getContext("2d");

if (barCtx2) {
    const { width, height } = barCtx2.canvas;
    const gradientV2 = barCtx2.createLinearGradient(0, 0, 0, height);
    let count = 0;
    for (let i = 0; i <= 360; i += 30) {
      count++;
      gradientV2.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }
    barCtx2.fillStyle = gradientV2;
    barCtx2.fillRect(0, 0, width, height);
  }