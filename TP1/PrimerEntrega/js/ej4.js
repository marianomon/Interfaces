function gradiente(){
    hex = document.getElementById('colorPicker').value;
    color = hexToRgb(hex);
    let r = color.r;
    let g = color.g;
    let b = color.b;
    let a = 255;
    var ctx = document.getElementById("canvas").getContext("2d");
    var imageData;
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for(x=0; x<canvas.height; x++){
        for(y=0; y<canvas.width; y++){
          setPixel(imageData, y, x, r, g, b, 255);
        }
        if(x%2 == 0){
          r++;
          g++;
          b++;
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

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
