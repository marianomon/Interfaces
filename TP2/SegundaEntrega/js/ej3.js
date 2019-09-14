var ctx = document.getElementById("canvas").getContext("2d");
let arrCirc = [];
let arrPoligon = [];
let contadorPol = 0;
let contador = 0;
let movimiento = false;
let clickeado = false;
let polActivo = 0;
canvas.addEventListener("click", verPos);

function verPos(){
  var rect = canvas.getBoundingClientRect();
  let ejeX = event.clientX - rect.left;
  let ejeY = event.clientY - rect.top;
  if (contadorPol>0) {
    console.log(estaAdentro(ejeX, ejeY).entro);
    if(estaAdentro(ejeX, ejeY).entro){
      clickeado = true;
      polActivo = estaAdentro(ejeX, ejeY).i
    }else {
      if(!movimiento || !clickeado){
        crearcirculo(rect, ejeX, ejeY);
      }
    }
  }else{
    if(!movimiento || !clickeado){
      crearcirculo(rect, ejeX, ejeY);
    }
  }
}

canvas.addEventListener("mousedown", function(){
  if(clickeado){
    movimiento = true;
  }
});

canvas.addEventListener("mousemove", function(){
  if(movimiento && clickeado){
    moverPol(event.layerX, event.layerY);
  }
});

function moverPol(X, Y){
  console.log(polActivo);
  let auxiX = arrPoligon[polActivo].centroX;
  let auxiY = arrPoligon[polActivo].centroY;
  arrPoligon[polActivo].centroX = X;
  arrPoligon[polActivo].centroY = Y;
  for (var i = 0; i < arrPoligon[polActivo].cantidadDePuntos; i++) {
      console.log("i " + i + " pol " +  polActivo);
      arrPoligon[polActivo].puntos[i].posX = arrPoligon[polActivo].puntos[i].posX - (auxiX - X);
      arrPoligon[polActivo].puntos[i].posY = arrPoligon[polActivo].puntos[i].posY - (auxiY - Y);
  }
  dibujarPol();
}

canvas.addEventListener("mouseup", function(){
  if(clickeado && movimiento){
    movimiento = false;
    clickeado = false;
    polActivo = 0;
    dibujarPol();
  }
})


function getMousePos(){
  var rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function dibujarPol(){
  limpiar();
  let x = 0;
  let y = 0;
  let desX = 0;
  let desY = 0;
  for (var i = 0; i < contadorPol; i++) {
    for (var j = 0; j < arrPoligon[i].cantidadDePuntos; j++) {
      ctx.beginPath();
      ctx.arc(arrPoligon[i].puntos[j].posX, arrPoligon[i].puntos[j].posY, 10 ,0, 2*Math.PI);
      ctx.strokeStyle = arrPoligon[i].puntos[j].color;
      if(j+1 < arrPoligon[polActivo].cantidadDePuntos){
        x = arrPoligon[i].puntos[j].posX;
        y = arrPoligon[i].puntos[j].posY;
        desX = arrPoligon[i].puntos[j+1].posX;
        desY = arrPoligon[i].puntos[j+1].posY;
        dibujarLineas(x, y, desX, desY);
      }else{
        x = arrPoligon[i].puntos[j].posX;
        y = arrPoligon[i].puntos[j].posY;
        desX = arrPoligon[i].puntos[0].posX;
        desY = arrPoligon[i].puntos[0].posY;
        dibujarLineas(x, y, desX, desY);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(arrPoligon[i].centroX, arrPoligon[i].centroY, 7 ,0, 2*Math.PI);
      ctx.strokeStyle = '#00ff00';
      ctx.stroke();
    }
  }
}

function dibujarLineas(x, y, desX, desY){
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(desX, desY);
  ctx.stroke();
}

function limpiar(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function estaAdentro(ejeX, ejeY){
  let posicionX = 0;
  let posicionY = 0;
  let centroX = 0;
  let centroY = 0;
  let entro = false;
  for (var i = 0; i < contadorPol; i++) {
    for (var j = 0; j <arrPoligon[i].puntos.length ; j++) {
      console.log("centro: " + centroX);
      if(ejeX > arrPoligon[i].centroX-25 && ejeX < arrPoligon[i].centroX+25 && ejeY > arrPoligon[i].centroY-25 && ejeY < arrPoligon[i].centroY+25 ) {
        console.log("entro en " + i);

        entro = true;
        return {entro, i};
      }
    }
  }
  return false;
}
function crearcirculo(rect, ejeX, ejeY){
  // var rect = canvas.getBoundingClientRect();
  // let ejeX = event.clientX - rect.left;
  // let ejeY = event.clientY - rect.top;
  let color = document.getElementById('colorPicker').value;
  let circulo = new Circulo(ejeX, ejeY, 10, color);
  arrCirc[contador] = circulo;
  contador++;
  dibujar();

}

function Circulo(ejeX, ejeY, rad, col){
  this.posX = ejeX;
  this.posY = ejeY;
  this.radio = rad;
  this.color = col;
}

function Poligono(cX, cY){
  this.puntos = arrCirc;
  this.cantidadDePuntos = contador;
  this.centroX = cX;
  this.centroY = cY;
    // for (var j = 0; j < contador; j++) {
    //   poligono[j] = arrCirc[j];
    // }

    // console.log(arrPoligon[contadorPol][0].posX)
    // if(contadorPol ==1){
    //
    //   console.log(arrPoligon[1][0].posX);
    // }

}
function dibujar(){
    ctx.beginPath();
    ctx.arc(arrCirc[contador-1].posX, arrCirc[contador-1].posY, arrCirc[contador-1].radio ,0, 2*Math.PI);
    ctx.strokeStyle = arrCirc[contador-1].color;
    if(contador>1){
      ctx.moveTo(arrCirc[contador-2].posX, arrCirc[contador-2].posY)
      ctx.lineTo(arrCirc[contador-1].posX, arrCirc[contador-1].posY);
    }
    ctx.stroke();
}


function CerrarPoligono(){

  ctx.beginPath();
  ctx.moveTo(arrCirc[contador-contador].posX, arrCirc[contador-contador].posY)
  ctx.lineTo(arrCirc[contador-1].posX, arrCirc[contador-1].posY);
  ctx.strokeStyle = arrCirc[contador-1].color;
  ctx.stroke();
  calcularCentro();
}


function limpiar(){
  for (var i = 0; i < contador; i++) {
    arrCirc[i] = null;
  }
  contador = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function calcularCentro(){
  let posicionX = 0;
  let posicionY = 0;
  for (var i = 0; i < contador; i++) {
    posicionX = posicionX + arrCirc[i].posX;
    posicionY = posicionY + arrCirc[i].posY;
  }
  let centroX = posicionX / contador-1;
  let centroY = posicionY / contador-1;
  console.log("calcular centro: " + centroX);
  ctx.beginPath();
  ctx.arc(centroX, centroY, 7 ,0, 2*Math.PI);
  ctx.strokeStyle = '#00ff00';
  ctx.stroke();
  arrPoligon[contadorPol] = new Poligono(centroX, centroY);
  // console.log("contador 1:" + contador);
  // console.log(contadorPol);
  console.log(arrPoligon[contadorPol]);
  contadorPol++;
  contador = 0;
  // console.log("contador 2: " + contador);
}
