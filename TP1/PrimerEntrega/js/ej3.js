var fileChooser = document.getElementById('imagen');
fileChooser.addEventListener('change', handleFileSelect, false);

function handleFileSelect(event){
  var files = event.target.files;
  if(files.length === 0){
    return;
  }
  var file = files[0];
  if(file.type !== '' && !file.type.match('image.*')){
    return;
  }
   window.URL = window.URL || window.webkitURL;
   var imageURL = window.URL.createObjectURL(file);
   pintar(imageURL);
   }

function pintar(url){
    let a = 255;
    let widthCanvas = 900;
    let heightCanvas = 600;
    let width = document.getElementById('ejeX').value;
    let height = document.getElementById('ejeY').value;
    var ctx = document.getElementById("canvas").getContext("2d");
    var imageData;
    var imagen1 = new Image();
    imagen1.src = url;
    imagen1.onload = function() {
      if (imagen1.width < widthCanvas) {
        alert("Debe seleccionar una imagen de por lo menos: " + canvas.width + " X " + canvas.height);
      }else {
        if(imagen1.width > imagen1.height){
          console.log("Canvas adaptado a landscape");
          canvas.width = widthCanvas;
          canvas.height = heightCanvas;
          myDrawImageMethod(this, ctx, imagen1);
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          ctx.putImageData(imageData, 0, 0);
        }else{
          console.log("canvas adaptado a retrato");
          canvas.width = heightCanvas;
          canvas.height = widthCanvas;
          myDrawImageMethod(this, ctx, imagen1);
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          ctx.putImageData(imageData, 0, 0);

        }


      }


    }


}
function myDrawImageMethod(image, ctx, imagen1){
  ctx.drawImage(imagen1, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
}


function setPixel(imageData, x, y, r, g, b, a){
  index = (x + y * imageData.width) * 4;
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}


function pintarPixeles(){
  let width = document.getElementById('ejeX').value;
  let height = document.getElementById('ejeY').value;
  var ctx = document.getElementById("canvas").getContext("2d");
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let hex = document.getElementById('colorPicker').value;
  let color = hexToRgb(hex);
  for(x=0; x< width; x++){
    for(y=0; y< height; y++){
      setPixel(imageData, x, y, color.r, color.g, color.b, 255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
