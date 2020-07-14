const size = 10;
const color1 = "#ff0000";
const color2 = "#ff000022";

const canvas = document.getElementById("canvas");
canvas.width = 49 * size;
canvas.height = 11 * size;

const ctx = canvas.getContext("2d");

// Information about how to draw the segments, on the form [vertical, x, y].
const segments = [
  [false, 1, 5],
  [true, 0, 1],
  [true, 0, 6],
  [false, 1, 10],
  [true, 5, 6],
  [true, 5, 1],
  [false, 1, 0],
].map((segment) =>
  segment.map((value) => (Number.isInteger(value) ? value * size : value))
);

// Inputs to the display, to draw 0-9.
const digits = [0x7e, 0x30, 0x6d, 0x79, 0x33, 0x5b, 0x5f, 0x70, 0x7f, 0x7b];

function drawDigit(digit) {
  let segmentOn = 0;
  for (let i = 0; i < segments.length; i++) {
    segmentOn = digit & 1;
    digit >>= 1;
    ctx.fillStyle = segmentOn ? color1 : color2;
    drawSegment(...segments[i]);
  }
}

function drawSegment(vertical, x, y) {
  if (vertical) {
    ctx.fillRect(x, y, size, 4 * size);
    drawCap(x, y, x + size / 2, y - size / 2, x + size, y);
    drawCap(
      x,
      y + 4 * size,
      x + size / 2,
      y + 4 * size + size / 2,
      x + size,
      y + 4 * size
    );
  } else {
    ctx.fillRect(x, y, 4 * size, size);
    drawCap(x, y, x - size / 2, y + size / 2, x, y + size);
    drawCap(
      x + 4 * size,
      y,
      x + 4 * size + size / 2,
      y + size / 2,
      x + 4 * size,
      y + size
    );
  }
}

function drawCap(x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.fill();
}

function drawCurrentTime() {
  const now = new Date();
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");
  const seconds = `${now.getSeconds()}`.padStart(2, "0");

  drawText(`${hours} ${minutes} ${seconds}`);
}

function drawText(text) {
  ctx.save();

  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) === " ") {
      ctx.translate(4 * size, 0);
    } else {
      const digitIndex = text.charCodeAt(i) - 48;
      drawDigit(digits[digitIndex]);
      ctx.translate(7 * size, 0);
    }
  }

  ctx.restore();
}

drawCurrentTime();

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCurrentTime();
}, 1000);
