//Tengo algo de estrucura para el 10 (arrPoligon, contador, etc), pero no pude hacerlo
//funcionar aproiadamente asi que restingi la funcion.
//linea 37 descomentar

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

function verPos(){
  let ejeX = event.layerX;
  let ejeY = event.layerY;
  if (contadorPol>0) {
    console.log(estaEnUnPunto(ejeX, ejeY).i);
    if(estaAdentro(ejeX, ejeY).entro){
      clickeado = true;
      polActivo = estaAdentro(ejeX, ejeY).i;
    }else if(estaEnUnPunto(ejeX, ejeY).entro){
      clickeado = true;
      esPunto = true;
      console.log("entro punto");
      console.log(arrPoligon[contadorPol-1].puntos[0].posY);
      console.log(arrPoligon[contadorPol-1].puntos[1].posY);
      console.log(arrPoligon[contadorPol-1].puntos[2].posY);
      puntoActivo = estaEnUnPunto(ejeX, ejeY).i;
    }else {
      if(!movimiento || !clickeado){
        // crearcirculo(ejeX, ejeY);
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
            if (arrPoligon[contadorPol-1].puntos.length > 3) {
              // console.log("elimina3 " + arrPoligon[contadorPol-1].puntos[0].color);
                eliminarpunto(estaEnUnPunto(event.layerX, event.layerY).i);

            } else {
                alert("El punto que desea eliminar no pertenece a un poligono de mas de 3 lados");
            }
        }
});

function eliminarpunto(i){
  delete arrPoligon[contadorPol-1].puntos[i];
  arrPoligon[contadorPol-1].puntos.splice(i, 1);
  arrPoligon[contadorPol-1].centroX = recalcularCentro().centroX;
  arrPoligon[contadorPol-1].centroY = recalcularCentro().centroY;
  dibujarPol();
}

document.body.onkeydown = function(event){
  var teclaChar = String.fromCharCode(event.keyCode);
  console.log(teclaChar);
    if (teclaChar == "C" || teclaChar == "c"){
        verificar = true;
        console.log(arrPoligon[0]);
        canvas.addEventListener("wheel", function(event) {
          console.log(verificar);
            if (verificar){
                event.preventDefault();
                cambiarColor(event);
            }
        }, false);
    }
};

document.getElementById('canvas').addEventListener("keyup",function(){
    verificar = false;
});


function cambiarColor(e){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < arrPoligon[contadorPol-1].puntos.length; i++) {
        if ((e.deltaY < 0) && ((colorAuxiliar >= 0)&&((colorAuxiliar <255)))) {
            colorAuxiliar++;
        }
        if ((e.deltaY > 0) && ((colorAuxiliar > 0)&&((colorAuxiliar <=255)))){
            colorAuxiliar--;
        }
        arrPoligon[contadorPol-1].puntos[i].color = rgbToHex(colorAuxiliar, colorAuxiliar, 0);
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
  arrPoligon[contadorPol-1].puntos[puntoActivo].posX = pX;
  arrPoligon[contadorPol-1].puntos[puntoActivo].posY = pY;
  arrPoligon[contadorPol-1].centroX = recalcularCentro().centroX;
  arrPoligon[contadorPol-1].centroY = recalcularCentro().centroY;
  dibujarPol();
}

function recalcularCentro(){
  let posicionX = 0;
  let posicionY = 0;
  for (var i = 0; i < arrPoligon[contadorPol-1].puntos.length; i++) {
    posicionX = posicionX + arrPoligon[contadorPol-1].puntos[i].posX;
    posicionY = posicionY + arrPoligon[contadorPol-1].puntos[i].posY;
  }
  let centroX = posicionX / arrPoligon[contadorPol-1].puntos.length;
  let centroY = posicionY / arrPoligon[contadorPol-1].puntos.length;

  return {centroX, centroY};
}

function moverPol(X, Y){
  // console.log(polActivo);
  let auxiX = arrPoligon[polActivo].centroX;
  let auxiY = arrPoligon[polActivo].centroY;
  arrPoligon[polActivo].centroX = X;
  arrPoligon[polActivo].centroY = Y;
  for (var i = 0; i < arrPoligon[polActivo].puntos.length; i++) {
      // console.log("i " + i + " pol " +  polActivo);
      arrPoligon[polActivo].puntos[i].posX = arrPoligon[polActivo].puntos[i].posX - (auxiX - X);
      arrPoligon[polActivo].puntos[i].posY = arrPoligon[polActivo].puntos[i].posY - (auxiY - Y);
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
      if(j+1 < arrPoligon[polActivo].puntos.length){
        x = arrPoligon[i].puntos[j].posX;
        y = arrPoligon[i].puntos[j].posY;
        desX = arrPoligon[i].puntos[j+1].posX;
        desY = arrPoligon[i].puntos[j+1].posY;
        dibujarLineas(x, y, desX, desY, arrPoligon[i].puntos[j].color);
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

function redibujarCirculos(X, Y, radio, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(X, Y, radio, 0, Math.PI * 2);
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
  let posicionX = 0;
  let posicionY = 0;
  let centroX = 0;
  let centroY = 0;
  let entro = false;
  for (var i = 0; i < contadorPol; i++) {
    for (var j = 0; j <arrPoligon[i].puntos.length ; j++) {
      if(ejeX > arrPoligon[i].centroX-25 && ejeX < arrPoligon[i].centroX+25 && ejeY > arrPoligon[i].centroY-25 && ejeY < arrPoligon[i].centroY+25 ) {
        entro = true;
        return {entro, i};
      }
    }
  }
  return false;
}

function estaEnUnPunto(ejeX, ejeY){
  let entro = false;
  for (var i = 0; i < arrPoligon[contadorPol-1].puntos.length; i++) {
    if(ejeX > arrPoligon[contadorPol-1].puntos[i].posX - 25 && ejeX < arrPoligon[contadorPol-1].puntos[i].posX + 25 && ejeY > arrPoligon[contadorPol-1].puntos[i].posY - 25 && ejeY < arrPoligon[contadorPol-1].puntos[i].posY + 25){
      entro = true;
      return {entro, i};
    }
  }
  return false;
}

function crearcirculo(ejeX, ejeY){
  let color = document.getElementById('colorPicker').value;
  let circulo = new Circulo(ejeX, ejeY, 10, color);
  arrCirc[contador] = circulo;
  contador++;
  dibujar();
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
  // console.log("calcular centro: " + centroX);
  ctx.beginPath();
  ctx.arc(centroX, centroY, 7 ,0, 2*Math.PI);
  ctx.strokeStyle = '#00ff00';
  ctx.stroke();
  arrPoligon[contadorPol] = new Poligono(centroX, centroY);
  // console.log("contador 1:" + contador);
  // console.log("contador pol " + contadorPol);

  // console.log(arrPoligon[0]);
  // if(contadorPol>0){
  //   console.log(arrPoligon[1]);
  // }
  contadorPol++;
  contador = 0;
  // console.log("contador: " + contador);
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
