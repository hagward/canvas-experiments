const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

function mapValues(values) {
  const width = canvas.width;
  const height = canvas.height;
  const maxValue = Math.max(...values.flatMap(x => x));

  return values.map(row =>
    row.map((value, i) => ({
      x: scaleX(i, width, row.length),
      y: scaleY(value, height, maxValue),
      value,
    }))
  );
}

function drawValues(values, callback) {
  const width = canvas.width;
  const height = canvas.height;
  const maxValue = Math.max(...values.flatMap(x => x));

  for (let row of values) {
    callback(row.map((value, i) => ({
      x: scaleX(i, width, row.length),
      y: scaleY(value, height, maxValue),
      value,
    })));
  }
}

function drawLines(values) {
  const colors = ['lightcoral', 'lightseagreen', 'lightskyblue'];
  let lineNum = 0;
  drawValues(values, coords => {
    ctx.strokeStyle = colors[lineNum++];
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.stroke();
  });
}

function drawText(values) {
  drawValues(values, coords =>
    coords.forEach(({x, y, value}) => ctx.fillText(value, x, y - 5))
  );
}

function scaleX(i, width, numValues) {
  return Math.floor(width/(numValues - 1) * i);
}

function scaleY(value, height, maxValue) {
  return Math.floor(height - (height/maxValue * value));
}

ctx.lineWidth = 3;

const values = [
  [0,5,3,4,7,9,15],
  [5,6,7,4,3,2,3],
  [14,13,12,7,7,8,6],
];

drawLines(values);
drawText(values)
