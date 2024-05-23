const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const window_height = 300;
const window_width = 500;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.backgroundColor = "#6e6e6e";

// Obtener referencia al elemento h5 para mostrar las coordenadas
const coordinatesDisplay = document.getElementById("coordinates");

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

    // Actualizar las coordenadas en el elemento h5
    coordinatesDisplay.innerHTML = `Coordenadas:<br> X = ${this.posX.toFixed(1)}<br> Y = ${this.posY.toFixed(1)}`;
  }
}

// Crear un círculo con propiedades aleatorias
let randomRadius = Math.floor(Math.random() * 60 + 20);
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 2);

// Función para actualizar y dibujar el círculo en cada frame
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
};

updateCircle();



/*
//SECCION MULTIBOLAS///////////////////////////////////
 const nCircles = 10;


let circles = [];


for (let i = 0; i < nCircles; i++) {

  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomTransparency = Math.random()*0.9;

  let randomBackcolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + randomTransparency *1 +")";
  let randomStrokecolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
let randomSpeed = Math.random()*3 +1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;

  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;


  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i+1, randomBackcolor, randomSpeed);

  circles.push(miCirculo);

}


let updateCircle = function () {

  requestAnimationFrame(updateCircle);

  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach((circle) => {

    circle.update(ctx);

  });

};

updateCircle();
*/