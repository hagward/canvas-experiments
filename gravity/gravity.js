const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

resizeCanvas();

const startStopButton = document.getElementById("startStopButton");
const addBodyButton = document.getElementById("addBodyButton");
const gravityInput = document.getElementById("gravityInput");
const gravitySpan = document.getElementById("gravitySpan");

const gravityScalar = 0.00001;

let gravity = gravityScalar * 5;
let running = false;

const bodies = [
  {
    color: "#ffdc00",
    mass: 100000,
    radius: 50,
    pos: {
      x: canvas.width / 2,
      y: canvas.height / 2
    },
    vel: {
      x: 0,
      y: 0
    },
    acc: {
      x: 0,
      y: 0
    },
    force: {
      x: 0,
      y: 0
    }
  },
  {
    color: "#ff4136",
    mass: 0.01,
    radius: 5,
    pos: {
      x: canvas.width / 2 + 150,
      y: canvas.height / 2
    },
    vel: {
      x: 0,
      y: -2
    },
    acc: {
      x: 0,
      y: 0
    },
    force: {
      x: 0,
      y: 0
    }
  },
  {
    color: "#0074d9",
    mass: 0.1,
    radius: 10,
    pos: {
      x: canvas.width / 2 + 250,
      y: canvas.height / 2
    },
    vel: {
      x: 0,
      y: -2
    },
    acc: {
      x: 0,
      y: 0
    },
    force: {
      x: 0,
      y: 0
    }
  },
  {
    color: "#3d9970",
    mass: 1,
    radius: 20,
    pos: {
      x: canvas.width / 2 + 350,
      y: canvas.height / 2
    },
    vel: {
      x: 0,
      y: -2
    },
    acc: {
      x: 0,
      y: 0
    },
    force: {
      x: 0,
      y: 0
    }
  }
];

window.addEventListener("resize", () => {
  resizeCanvas();
  draw();
});

startStopButton.addEventListener("click", () => {
  running = !running;
  startStopButton.innerText = running ? "Stop" : "Start";

  if (running) {
    window.requestAnimationFrame(step);
  }
});

addBodyButton.addEventListener("click", () => {
  addRandomBody();
  draw();
});

gravityInput.addEventListener("input", event => {
  const value = event.target.value;
  gravity = gravityScalar * value;
  gravitySpan.innerText = value;
});

draw();

function step() {
  if (!running) {
    return;
  }

  update();
  draw();

  window.requestAnimationFrame(step);
}

function update() {
  for (const body of bodies) {
    body.acc.x = body.force.x / body.mass;
    body.acc.y = body.force.y / body.mass;

    body.vel.x += body.acc.x;
    body.vel.y += body.acc.y;

    body.pos.x += body.vel.x;
    body.pos.y += body.vel.y;

    body.force.x = 0;
    body.force.y = 0;
  }

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i === j) continue;

      const a = bodies[i];
      const b = bodies[j];

      const dx = b.pos.x - a.pos.x;
      const dy = b.pos.y - a.pos.y;
      const angle = Math.atan2(dy, dx);
      const force =
        (gravity * (a.mass * b.mass)) / Math.sqrt(dx * dx + dy * dy);

      a.force.x += Math.cos(angle) * force;
      a.force.y += Math.sin(angle) * force;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const body of bodies) {
    drawBody(body);
  }
}

function drawBody(body) {
  const { pos, radius, color } = body;
  drawCircle(pos.x, pos.y, radius, color);
}

function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function addRandomBody() {
  bodies.push({
    mass: getRandomFloat(0.01, 50),
    radius: getRandomFloat(0.5, 20),
    pos: {
      x: getRandomFloat(0, canvas.width),
      y: getRandomFloat(0, canvas.height)
    },
    vel: {
      x: getRandomFloat(-5, 5),
      y: getRandomFloat(-5, 5)
    },
    acc: {
      x: 0,
      y: 0
    },
    force: {
      x: 0,
      y: 0
    }
  });
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
