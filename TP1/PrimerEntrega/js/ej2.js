function pintar(){
  let y = document.getElementById('ejeY').value;
  let x = document.getElementById('ejeX').value;
  let color = document.getElementById('colorPicker').value;
  if(y <= canvas.height){
    if (x <= canvas.width) {
      var ctx= document.getElementById("canvas").getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  		ctx.fillStyle = color;
  		ctx.fillRect(0, 0, x, y);
    }else{
      alert("valor maximo de x =" + canvas.width);
    }
  }else{
    alert("valor maximo de Y =" + canvas.height);
  }
}
