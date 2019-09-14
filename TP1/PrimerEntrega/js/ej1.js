
function genera_tabla() {
  // Obtener la referencia del elemento cuerpo
  var body = document.getElementsByClassName('tablas')[0];
  let matriz = [];
  let max = 0;
  let min = 100;
  // referenciar elementos table y tbody
  var cuerpo = document.createElement('div');
  cuerpo.className = 'col-12 tabla';
  var tabla   = document.createElement('table');
  tabla.className = 'centrarTabla';
  var tblBody = document.createElement("tbody");
  let alto = document.getElementById('alto').value;
  let ancho =  document.getElementById('ancho').value;
  //genera los numeros aleatorios en base a la altura y ancho
  for (var i = 0; i < alto; i++) {
    matriz[i]= [];
    for (var j = 0; j < ancho; j++) {
      matriz[i][j] = Math.floor(Math.random() * 100);
    }
  }
  let valorRadioButton = getRadioButtonSelectedValue(document.radio.conjunto);

  // Crea las celdas
  for (var i = 0; i < alto; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
    for (var j = 0; j < ancho; j++) {
      var celda = document.createElement("td");
      //asigna cada numero a cada celda
      var numeroCelda = document.createTextNode(matriz[i][j]);
      celda.appendChild(numeroCelda);
      hilera.appendChild(celda);
    }
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  cuerpo.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");

  if (valorRadioButton == 1) {
    for (var i = 0; i < ancho; i++) {
      for (var j = 0; j < alto; j++) {
        max = encontrarMayor(i, j, matriz, max);
      }
    }
    let valorMaximo = document.createElement("p");
    let display = document.createTextNode("Maximo de toda la matriz= " + max);
    valorMaximo.appendChild(display);
    cuerpo.appendChild(valorMaximo);

  }else if (valorRadioButton == 2) {
    for (var i = 0; i < alto; i++) {
    max= 0;
    if(i%2==0){
      for (var k = 0; k < ancho; k++) {
        if(matriz[i][k] > max){
          max = matriz[i][k];
        }
      }
      let valor = document.createElement("p");
      let display = document.createTextNode("Maximo de la fila "+ i + " = " + max);
      valor.appendChild(display);
      cuerpo.appendChild(valor);
      max=0;
    }else{
      for (var k = 0; k < ancho; k++) {
        if(matriz[i][k] < min){
          min = matriz[i][k];
        }
      }
      let valor = document.createElement("p");
      let display = document.createTextNode("Minimo de la fila "+ i + " = " + min);
      valor.appendChild(display);
      cuerpo.appendChild(valor);
        min = 100;
    }
  }
  }else if (valorRadioButton == 3) {
    for (var i = 0; i < alto; i++) {
      let arrPromedio = [];
      let promedio = 0;
      promedio = sacarPromedio(i, matriz, promedio, ancho);
      arrPromedio[i] = promedio/ancho;
      let valor = document.createElement("p");
      let display = document.createTextNode("Promedio de la fila "+ i + " = " + arrPromedio[i]);
      valor.appendChild(display);
      cuerpo.appendChild(valor);
    }
  }
  body.appendChild(cuerpo);
}

function getRadioButtonSelectedValue(ctrl){
    for(let i=0;i<ctrl.length;i++)
      if(ctrl[i].checked) return ctrl[i].value;
    }

function encontrarMayor(i, j, matriz, maximo){
  if(matriz[i][j] > maximo){
    maximo = matriz[i][j];
    return maximo;
  }
  return maximo;
}

function sacarPromedio(i, matriz, prom, ancho){
  for(var j = 0; j < ancho; j++){
    prom = prom + matriz[i][j];
    }
    return prom;
}
