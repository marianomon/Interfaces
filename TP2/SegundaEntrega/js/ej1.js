var ctx = document.getElementById("canvas").getContext("2d");
canvas.addEventListener("click", Coordenadas);

function Coordenadas(){
  let ejeX = document.getElementById('X');
  let ejeY =  document.getElementById('Y');
  ejeX.value = event.clientX;
  ejeY.value = event.clientY;
  console.log(event.clientX);
  console.log(event.clientY);
  console.log("click");

}
