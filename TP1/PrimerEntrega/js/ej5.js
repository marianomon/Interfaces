function gradiente(){

  let r = 0;
  let g = 0;
  let b = 0;
  let a = 255;
  var ctx = document.getElementById("canvas").getContext("2d");
  var imageData;
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(x=0; x<canvas.height; x++){
      for(y=0; y<canvas.width; y++){
        setPixel(imageData, y, x, r, g, b, 255);
      }
      if(x <= canvas.height/2){
        r++;
        g++;
        b--;
      }else{
        g--;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function myDrawImageMethod(image){
    ctx.drawImage(imagen1, 0, 0);
  }

function setPixel(imageData, x, y, r, g, b, a){
  index = (x + y * imageData.width) * 4;
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}
