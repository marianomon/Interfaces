var ctx = document.getElementById("canvas").getContext("2d");
canvas.addEventListener("click", circulo);

function circulo(){
  var rect = canvas.getBoundingClientRect();
    
  let ejeX = event.clientX - rect.left;
  let ejeY = event.clientY - rect.top;
  console.log(event.clientX);
  console.log(event.clientY);
  console.log("click");

  ctx.beginPath();
  ctx.arc(ejeX, ejeY, 100,0, 2*Math.PI);
  ctx.strokeStyle = document.getElementById('colorPicker').value;
  ctx.stroke();

}
