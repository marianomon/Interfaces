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
   subirImg(imageURL);
   }

function subirImg(url){
    let widthCanvas = 900;
    let heightCanvas = 600;
    var ctx = document.getElementById("canvas").getContext("2d");
    var imageData;
    var imagen1 = new Image();
    imagen1.src = url;
    imagen1.onload = function() {
      if (imagen1.width < widthCanvas) {
        alert("Debe seleccionar una imagen de por lo menos: " + widthCanvas + " X " + heightCanvas);
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
  let prom = (imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2])/3;
  imageData.data[index+0] = prom;
  imageData.data[index+1] = prom;
  imageData.data[index+2] = prom;
  imageData.data[index+3] = a;
}


function filtro(){
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 255;
  var ctx = document.getElementById("canvas").getContext("2d");
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for(x=0; x< imageData.width; x++){
    for(y=0; y< imageData.height; y++){
      setPixel(imageData, x, y, r, g, b, a);
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
