const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const window_height = 300;
const window_width = 500;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.backgroundColor = "#6e6e6e";

// Obtener referencia a la tabla para mostrar las coordenadas
const coordinatesTable = document.getElementById("coordinatesTable").getElementsByTagName('tbody')[0];

// Clase Circle
class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
    this.speed = speed;
    this.dx = 0.2 * this.speed;
    this.dy = 0.2 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();

    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    this.draw(context);

    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;

    // Actualizar las coordenadas en la tabla
    const row = document.getElementById(`circle-${this.text}`);
    if (row) {
      row.cells[1].innerText = this.posX.toFixed(1);
      row.cells[2].innerText = this.posY.toFixed(1);
    }
  }
}

// Comentamos la sección de un solo círculo
/*
let randomRadius = Math.floor(Math.random() * 60 + 20);
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 2);

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
};

updateCircle();
*/

// Sección de múltiples círculos
const nCircles = 10;
let circles = [];

// Crear círculos y añadir filas a la tabla
for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomTransparency = Math.random() * 0.9;

  let randomBackcolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + randomTransparency + ")";
  let randomStrokecolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomSpeed = Math.random() * 3 + 1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);
  circles.push(miCirculo);

  // Añadir una fila para el círculo en la tabla
  let row = coordinatesTable.insertRow();
  row.id = `circle-${i + 1}`;
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerText = i + 1;
  cell2.innerText = randomX.toFixed(1);
  cell3.innerText = randomY.toFixed(1);
}

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach((circle) => {
    circle.update(ctx);
  });
};

updateCircle();
