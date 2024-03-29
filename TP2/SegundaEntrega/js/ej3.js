var ctx = document.getElementById("canvas").getContext("2d");
let arrCirc = [];
let arrPoligon = [];
let contadorPol = 0;
let cantCirculos = 0;
let contador = 0;
let movimiento = false;
let clickeado = false;
let polActivo = 0;
let puntoActivo = 0;
let esPunto = false;
let verificar = false;
let colorAuxiliar = 255;

function recargar(){
  arrCirc = [];
  arrPoligon = [];
  contadorPol = 0;
  contador = 0;
  polActivo = 0;
  puntoActivo = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function verPos(){
  let ejeX = event.layerX;
  let ejeY = event.layerY;
  if (contadorPol>0) {
    if(estaAdentro(ejeX, ejeY).entro){
      clickeado = true;
      polActivo = estaAdentro(ejeX, ejeY).i;
    }else if(estaEnUnPunto(ejeX, ejeY).entro){
      clickeado = true;
      esPunto = true;
      puntoActivo = estaEnUnPunto(ejeX, ejeY).j;
      polActivo =  estaEnUnPunto(ejeX, ejeY).i;
    }else {
      if(!movimiento || !clickeado){
         crearcirculo(ejeX, ejeY);
      }
    }
  }else{
    if(!movimiento || !clickeado){
      crearcirculo(ejeX, ejeY);
    }
  }
}

canvas.addEventListener("dblclick", function () {
        if (estaEnUnPunto(event.layerX, event.layerY).entro) {
            if (arrPoligon[estaEnUnPunto(event.layerX, event.layerY).i].puntos.length > 3) {
              polActivo = estaEnUnPunto(event.layerX, event.layerY).i;
              puntoActivo = estaEnUnPunto(event.layerX, event.layerY).j;
              eliminarpunto();
            } else {
                alert("El punto que desea eliminar no pertenece a un poligono de mas de 3 lados");
            }
        }
});

function eliminarpunto(){
  delete arrPoligon[polActivo].puntos[puntoActivo];
  arrPoligon[polActivo].puntos.splice(puntoActivo, 1);
  arrPoligon[polActivo].centroX = recalcularCentro().centroX;
  arrPoligon[polActivo].centroY = recalcularCentro().centroY;
  dibujarPol();
}

document.body.onkeydown = function(event){
  var teclaChar = String.fromCharCode(event.keyCode);
    if (teclaChar == "C" || teclaChar == "c"){
        verificar = true;
        canvas.addEventListener("wheel", function(event) {
            if (verificar){
                event.preventDefault();
                cambiarColor(event);
            }
        });
    }
};

document.body.onkeyup = function(event){
  var teclaChar = String.fromCharCode(event.keyCode);
    if (teclaChar == "C" || teclaChar == "c"){
      verificar = false;
    }
};


function cambiarColor(e){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < arrPoligon.length; i++) {
      for (let j = 0; j < arrPoligon[i].puntos.length; j++) {
        if ((e.deltaY < 0) && ((colorAuxiliar >= 0)&&((colorAuxiliar <255)))) {
            colorAuxiliar++;
        }
        if ((e.deltaY > 0) && ((colorAuxiliar > 0)&&((colorAuxiliar <=255)))){
            colorAuxiliar--;
        }

        arrPoligon[i].puntos[j].color = rgbToHex(colorAuxiliar, 0, 0);
      }
    }
    dibujarPol();
}

canvas.addEventListener("mousedown", function(){
  verPos();
  if(clickeado){
    movimiento = true;
  }
});

canvas.addEventListener("mousemove", function(){
if(movimiento && clickeado && esPunto){
  moverPunto(event.layerX, event.layerY);
}else if(movimiento && clickeado){
  moverPol(event.layerX, event.layerY);
}
});

function moverPunto(pX, pY){
  arrPoligon[polActivo].puntos[puntoActivo].posX = pX;
  arrPoligon[polActivo].puntos[puntoActivo].posY = pY;
  arrPoligon[polActivo].centroX = recalcularCentro().centroX;
  arrPoligon[polActivo].centroY = recalcularCentro().centroY;
  dibujarPol();
}

function recalcularCentro(){
  let posicionX = 0;
  let posicionY = 0;
  for (var i = 0; i < arrPoligon[polActivo].puntos.length; i++) {
    posicionX = posicionX + arrPoligon[polActivo].puntos[i].posX;
    posicionY = posicionY + arrPoligon[polActivo].puntos[i].posY;
  }
  let centroX = posicionX / arrPoligon[polActivo].puntos.length;
  let centroY = posicionY / arrPoligon[polActivo].puntos.length;

  return {centroX, centroY};
}

function moverPol(x, y){
  let auxiX = arrPoligon[polActivo].centroX;
  let auxiY = arrPoligon[polActivo].centroY;
  arrPoligon[polActivo].centroX = x;
  arrPoligon[polActivo].centroY = y;
  for (var i = 0; i < arrPoligon[polActivo].puntos.length; i++) {
      arrPoligon[polActivo].puntos[i].posX = arrPoligon[polActivo].puntos[i].posX - (auxiX - x);
      arrPoligon[polActivo].puntos[i].posY = arrPoligon[polActivo].puntos[i].posY - (auxiY - y);
  }
  dibujarPol();
}

canvas.addEventListener("mouseup", function(){
  if(clickeado && movimiento){
    movimiento = false;
    clickeado = false;
    esPunto = false;
    puntoActivo = 0;
    polActivo = 0;
    dibujarPol();
  }
})

function dibujarPol(){
  limpiar();
  let x = 0;
  let y = 0;
  let desX = 0;
  let desY = 0;
  for (var i = 0; i < arrPoligon.length; i++) {
    for (var j = 0; j < arrPoligon[i].puntos.length; j++) {
      redibujarCirculos(arrPoligon[i].puntos[j].posX, arrPoligon[i].puntos[j].posY, arrPoligon[i].puntos[j].radio, arrPoligon[i].puntos[j].color);
      ctx.strokeStyle = arrPoligon[i].puntos[j].color;
      if(j+1 < arrPoligon[i].puntos.length){
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
      dibujarCentro(arrPoligon[i].centroX, arrPoligon[i].centroY);
    }
  }
}

function redibujarCirculos(x, y, radio, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radio, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function dibujarCentro(X, Y){
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(X, Y, 7 ,0, 2*Math.PI);
  ctx.strokeStyle = '#00ff00';
  ctx.stroke();
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
  let entro = false;
  for (var i = 0; i < arrPoligon.length; i++) {
      if(ejeX > arrPoligon[i].centroX-25 && ejeX < arrPoligon[i].centroX+25 && ejeY > arrPoligon[i].centroY-25 && ejeY < arrPoligon[i].centroY+25 ){
        entro = true;
        return {entro, i};
      }
  }
  return false;
}

function estaEnUnPunto(ejeX, ejeY){
  let entro = false;
  for (var i = 0; i < arrPoligon.length; i++) {
    for (var j = 0; j < arrPoligon[i].puntos.length; j++) {
      if(ejeX > arrPoligon[i].puntos[j].posX - 25 && ejeX < arrPoligon[i].puntos[j].posX + 25 && ejeY > arrPoligon[i].puntos[j].posY - 25 && ejeY < arrPoligon[i].puntos[j].posY + 25){
        entro = true;
        return {entro, i, j};
      }
    }
  }

  return false;
}

function crearcirculo(ejeX, ejeY){
  if (!movimiento) {
    let color = document.getElementById('colorPicker').value;
    let circulo = new Circulo(ejeX, ejeY, 10, color);
    arrCirc[contador] = circulo;
    contador++;
    dibujar();
  }else{
    movimiento = false;
  }

}

class Circulo{
  constructor(ejeX, ejeY, rad, col){
    this.posX = ejeX;
    this.posY = ejeY;
    this.radio = rad;
    this.color = col;

  }
}

class Poligono{
  constructor(cX, cY){
    this.puntos = arrCirc;
    this.centroX = cX;
    this.centroY = cY;
  }
}

// ctx.fillStyle = color;
// ctx.beginPath();
// ctx.arc(X, Y, radio, 0, Math.PI * 2);
// ctx.fill();
// ctx.closePath();

function dibujar(){
    ctx.beginPath();
    ctx.arc(arrCirc[contador-1].posX, arrCirc[contador-1].posY, arrCirc[contador-1].radio ,0, 2*Math.PI);
    ctx.fillStyle = arrCirc[contador-1].color;
    if(contador>1){
      ctx.moveTo(arrCirc[contador-2].posX, arrCirc[contador-2].posY)
      ctx.lineTo(arrCirc[contador-1].posX, arrCirc[contador-1].posY);
    }
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}


function CerrarPoligono(){
  ctx.beginPath();
  ctx.moveTo(arrCirc[contador-contador].posX, arrCirc[contador-contador].posY)
  ctx.lineTo(arrCirc[contador-1].posX, arrCirc[contador-1].posY);
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
  ctx.beginPath();
  ctx.arc(centroX, centroY, 7 ,0, 2*Math.PI);
  ctx.strokeStyle = '#00ff00';
  ctx.stroke();
  arrPoligon[contadorPol] = new Poligono(centroX, centroY);
  arrCirc = [];
  contadorPol++;
  contador = 0;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
